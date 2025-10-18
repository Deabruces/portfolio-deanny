/**
 * WCAG 2.1 Level AA Compliance Scanner
 * Automated accessibility violation detection
 */

import { getContrastRatio, parseColor } from './contrast-checker';

export interface AccessibilityIssue {
  id: string;
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriterion: string;
  element: string;
  issue: string;
  suggestion: string;
  location?: string;
}

export interface ScanResult {
  totalIssues: number;
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  issues: AccessibilityIssue[];
  score: number; // 0-100
  passedChecks: number;
  totalChecks: number;
}

/**
 * Check for missing alt text on images
 */
export function checkImageAlt(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  const images = document.querySelectorAll('img');

  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const src = img.getAttribute('src') || 'unknown';

    // Decorative images should have alt=""
    const isDecorative = img.getAttribute('role') === 'presentation' ||
                         img.getAttribute('aria-hidden') === 'true';

    if (alt === null && !isDecorative) {
      issues.push({
        id: `img-alt-${index}`,
        severity: 'critical',
        wcagLevel: 'A',
        wcagCriterion: '1.1.1 Non-text Content',
        element: `<img src="${src}">`,
        issue: 'Image missing alt attribute',
        suggestion: 'Add descriptive alt text or alt="" for decorative images',
        location: src,
      });
    } else if (alt === '' && !isDecorative) {
      issues.push({
        id: `img-alt-empty-${index}`,
        severity: 'serious',
        wcagLevel: 'A',
        wcagCriterion: '1.1.1 Non-text Content',
        element: `<img src="${src}">`,
        issue: 'Non-decorative image has empty alt text',
        suggestion: 'Provide meaningful alt text describing the image content',
        location: src,
      });
    }
  });

  return issues;
}

/**
 * Check color contrast ratios
 */
export function checkColorContrast(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  // Check text elements
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, div, li, td, th, label');

  textElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const textColor = parseColor(computedStyle.color);
    const bgColor = parseColor(computedStyle.backgroundColor);

    if (!textColor || !bgColor) return;

    // Check if background is transparent, look for parent background
    if (bgColor === '#00000000' || computedStyle.backgroundColor === 'transparent') {
      let parent = element.parentElement;
      let foundBg = false;

      while (parent && !foundBg) {
        const parentStyle = window.getComputedStyle(parent);
        const parentBg = parseColor(parentStyle.backgroundColor);

        if (parentBg && parentBg !== '#00000000') {
          const ratio = getContrastRatio(textColor, parentBg);

          if (ratio < 4.5) {
            issues.push({
              id: `contrast-${index}`,
              severity: 'serious',
              wcagLevel: 'AA',
              wcagCriterion: '1.4.3 Contrast (Minimum)',
              element: element.tagName.toLowerCase(),
              issue: `Insufficient contrast ratio: ${ratio.toFixed(2)}:1 (minimum 4.5:1)`,
              suggestion: `Increase contrast between text (${textColor}) and background (${parentBg})`,
              location: element.textContent?.substring(0, 50) || '',
            });
          }
          foundBg = true;
        }
        parent = parent.parentElement;
      }
    } else {
      const ratio = getContrastRatio(textColor, bgColor);

      if (ratio < 4.5) {
        issues.push({
          id: `contrast-${index}`,
          severity: 'serious',
          wcagLevel: 'AA',
          wcagCriterion: '1.4.3 Contrast (Minimum)',
          element: element.tagName.toLowerCase(),
          issue: `Insufficient contrast ratio: ${ratio.toFixed(2)}:1 (minimum 4.5:1)`,
          suggestion: `Increase contrast between text (${textColor}) and background (${bgColor})`,
          location: element.textContent?.substring(0, 50) || '',
        });
      }
    }
  });

  return issues;
}

/**
 * Check for proper heading hierarchy
 */
export function checkHeadingHierarchy(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  let previousLevel = 0;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));

    // Check for skipped levels
    if (previousLevel > 0 && level > previousLevel + 1) {
      issues.push({
        id: `heading-skip-${index}`,
        severity: 'moderate',
        wcagLevel: 'A',
        wcagCriterion: '1.3.1 Info and Relationships',
        element: heading.tagName.toLowerCase(),
        issue: `Heading level skipped from h${previousLevel} to h${level}`,
        suggestion: 'Use sequential heading levels (h1 -> h2 -> h3, etc.)',
        location: heading.textContent?.substring(0, 50) || '',
      });
    }

    previousLevel = level;
  });

  // Check for multiple h1s
  const h1Count = document.querySelectorAll('h1').length;
  if (h1Count > 1) {
    issues.push({
      id: 'multiple-h1',
      severity: 'moderate',
      wcagLevel: 'A',
      wcagCriterion: '1.3.1 Info and Relationships',
      element: 'h1',
      issue: `Multiple h1 elements found (${h1Count})`,
      suggestion: 'Use only one h1 per page for the main heading',
    });
  }

  return issues;
}

/**
 * Check for form accessibility
 */
export function checkFormAccessibility(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  // Check inputs have labels
  const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');

  inputs.forEach((input, index) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const title = input.getAttribute('title');

    // Check if there's an associated label
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);

    if (!hasLabel && !ariaLabel && !ariaLabelledBy && !title) {
      issues.push({
        id: `form-label-${index}`,
        severity: 'critical',
        wcagLevel: 'A',
        wcagCriterion: '4.1.2 Name, Role, Value',
        element: input.tagName.toLowerCase(),
        issue: 'Form control missing accessible label',
        suggestion: 'Add a <label> element or aria-label attribute',
        location: input.getAttribute('name') || input.getAttribute('placeholder') || '',
      });
    }
  });

  // Check for fieldset/legend in groups
  const radioGroups = new Map<string, Element[]>();
  const checkboxGroups = new Map<string, Element[]>();

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    const name = radio.getAttribute('name');
    if (name) {
      if (!radioGroups.has(name)) {
        radioGroups.set(name, []);
      }
      radioGroups.get(name)?.push(radio);
    }
  });

  radioGroups.forEach((radios, name) => {
    if (radios.length > 1) {
      const inFieldset = radios.some(radio => radio.closest('fieldset'));

      if (!inFieldset) {
        issues.push({
          id: `radio-fieldset-${name}`,
          severity: 'moderate',
          wcagLevel: 'A',
          wcagCriterion: '1.3.1 Info and Relationships',
          element: 'input[type="radio"]',
          issue: `Radio group "${name}" not wrapped in <fieldset>`,
          suggestion: 'Wrap related radio buttons in <fieldset> with <legend>',
        });
      }
    }
  });

  return issues;
}

/**
 * Check for keyboard accessibility
 */
export function checkKeyboardAccessibility(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  // Check for onClick handlers on non-interactive elements
  const clickHandlers = document.querySelectorAll('[onclick], [ng-click]');

  clickHandlers.forEach((element, index) => {
    const tagName = element.tagName.toLowerCase();
    const isInteractive = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
    const hasTabIndex = element.hasAttribute('tabindex');
    const role = element.getAttribute('role');

    if (!isInteractive && !hasTabIndex && role !== 'button') {
      issues.push({
        id: `keyboard-${index}`,
        severity: 'serious',
        wcagLevel: 'A',
        wcagCriterion: '2.1.1 Keyboard',
        element: tagName,
        issue: 'Click handler on non-keyboard-accessible element',
        suggestion: 'Add tabindex="0" and keyboard event handlers, or use <button>',
        location: element.textContent?.substring(0, 50) || '',
      });
    }
  });

  // Check for positive tabindex values
  const positiveTabindex = document.querySelectorAll('[tabindex]');

  positiveTabindex.forEach((element, index) => {
    const tabindex = parseInt(element.getAttribute('tabindex') || '0');

    if (tabindex > 0) {
      issues.push({
        id: `tabindex-${index}`,
        severity: 'moderate',
        wcagLevel: 'A',
        wcagCriterion: '2.4.3 Focus Order',
        element: element.tagName.toLowerCase(),
        issue: `Positive tabindex="${tabindex}" disrupts natural tab order`,
        suggestion: 'Use tabindex="0" or restructure HTML for logical tab order',
      });
    }
  });

  return issues;
}

/**
 * Check for ARIA usage
 */
export function checkARIA(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  // Check for invalid ARIA attributes
  const elementsWithARIA = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');

  elementsWithARIA.forEach((element, index) => {
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const ariaDescribedBy = element.getAttribute('aria-describedby');

    // Check if referenced IDs exist
    if (ariaLabelledBy) {
      const ids = ariaLabelledBy.split(' ');
      ids.forEach(id => {
        if (!document.getElementById(id)) {
          issues.push({
            id: `aria-labelledby-${index}`,
            severity: 'serious',
            wcagLevel: 'A',
            wcagCriterion: '4.1.2 Name, Role, Value',
            element: element.tagName.toLowerCase(),
            issue: `aria-labelledby references non-existent ID "${id}"`,
            suggestion: 'Ensure the referenced element exists or use aria-label instead',
          });
        }
      });
    }

    if (ariaDescribedBy) {
      const ids = ariaDescribedBy.split(' ');
      ids.forEach(id => {
        if (!document.getElementById(id)) {
          issues.push({
            id: `aria-describedby-${index}`,
            severity: 'moderate',
            wcagLevel: 'A',
            wcagCriterion: '4.1.2 Name, Role, Value',
            element: element.tagName.toLowerCase(),
            issue: `aria-describedby references non-existent ID "${id}"`,
            suggestion: 'Ensure the referenced element exists',
          });
        }
      });
    }
  });

  return issues;
}

/**
 * Check for language declaration
 */
export function checkLanguage(document: Document): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];

  const htmlElement = document.documentElement;
  const lang = htmlElement.getAttribute('lang');

  if (!lang) {
    issues.push({
      id: 'lang-missing',
      severity: 'serious',
      wcagLevel: 'A',
      wcagCriterion: '3.1.1 Language of Page',
      element: 'html',
      issue: 'Page language not declared',
      suggestion: 'Add lang attribute to <html> element (e.g., lang="es")',
    });
  }

  return issues;
}

/**
 * Run comprehensive WCAG scan
 */
export function runAccessibilityScan(document: Document): ScanResult {
  const allIssues: AccessibilityIssue[] = [
    ...checkImageAlt(document),
    ...checkColorContrast(document),
    ...checkHeadingHierarchy(document),
    ...checkFormAccessibility(document),
    ...checkKeyboardAccessibility(document),
    ...checkARIA(document),
    ...checkLanguage(document),
  ];

  const critical = allIssues.filter(i => i.severity === 'critical').length;
  const serious = allIssues.filter(i => i.severity === 'serious').length;
  const moderate = allIssues.filter(i => i.severity === 'moderate').length;
  const minor = allIssues.filter(i => i.severity === 'minor').length;

  // Calculate score (100 - weighted penalties)
  const totalChecks = 50; // Approximate number of checks performed
  const passedChecks = totalChecks - allIssues.length;

  const criticalPenalty = critical * 10;
  const seriousPenalty = serious * 5;
  const moderatePenalty = moderate * 2;
  const minorPenalty = minor * 1;

  const score = Math.max(0, 100 - criticalPenalty - seriousPenalty - moderatePenalty - minorPenalty);

  return {
    totalIssues: allIssues.length,
    critical,
    serious,
    moderate,
    minor,
    issues: allIssues,
    score,
    passedChecks,
    totalChecks,
  };
}
