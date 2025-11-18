import { useState } from 'react';
import { runAccessibilityScan } from '../utils/wcag-scanner';
import { checkContrast, fixContrast } from '../utils/contrast-checker';

export default function AccessibilityChecker() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [generatingAltText, setGeneratingAltText] = useState(false);

  const runScan = () => {
    setIsScanning(true);

    // Small delay to show loading state
    setTimeout(() => {
      const result = runAccessibilityScan(document);
      setScanResult(result);
      setIsScanning(false);
    }, 1000);
  };

  const generateAltText = async (imageUrl) => {
    setGeneratingAltText(true);

    try {
      const response = await fetch('/api/accessibility-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-alt-text',
          data: { imageUrl },
        }),
      });

      const data = await response.json();

      if (data.altText) {
        // Copy to clipboard
        navigator.clipboard.writeText(data.altText);
        alert(`Alt text copied to clipboard:\n\n"${data.altText}"`);
      }
    } catch (error) {
      console.error('Alt text generation error:', error);
      alert('Error generating alt text. Please try again.');
    } finally {
      setGeneratingAltText(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'serious': return '#f97316';
      case 'moderate': return '#eab308';
      case 'minor': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#eab308';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const exportReport = () => {
    if (!scanResult) return;

    const report = {
      timestamp: new Date().toISOString(),
      score: scanResult.score,
      summary: {
        totalIssues: scanResult.totalIssues,
        critical: scanResult.critical,
        serious: scanResult.serious,
        moderate: scanResult.moderate,
        minor: scanResult.minor,
      },
      issues: scanResult.issues,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accessibility-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="accessibility-checker">
      <style>{`
        .accessibility-checker {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .checker-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .checker-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .checker-header p {
          font-size: 1.125rem;
          color: light-dark(#64748b, #94a3b8);
          max-width: 600px;
          margin: 0 auto;
        }

        .scan-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .btn-scan {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        }

        .btn-secondary {
          background: light-dark(#f1f5f9, #1e293b);
          color: light-dark(#1e293b, #f1f5f9);
        }

        .btn-secondary:hover {
          background: light-dark(#e2e8f0, #334155);
        }

        .btn-scan:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .scan-results {
          margin-top: 2rem;
        }

        .score-card {
          background: light-dark(white, #1e293b);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .score-circle {
          width: 150px;
          height: 150px;
          margin: 0 auto 1rem;
          position: relative;
        }

        .score-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          font-weight: 800;
        }

        .score-label {
          font-size: 1rem;
          color: light-dark(#64748b, #94a3b8);
          margin-top: 0.5rem;
        }

        .score-circle svg {
          transform: rotate(-90deg);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .stat-item {
          padding: 1rem;
          border-radius: 12px;
          background: light-dark(#f8fafc, #0f172a);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: light-dark(#64748b, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .issues-section {
          margin-top: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: light-dark(#1e293b, #f1f5f9);
        }

        .severity-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid transparent;
          border-radius: 8px;
          background: light-dark(#f1f5f9, #1e293b);
          color: light-dark(#475569, #cbd5e1);
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #8b5cf6;
        }

        .filter-btn.active {
          background: #8b5cf6;
          color: white;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .issue-card {
          background: light-dark(white, #1e293b);
          border-radius: 12px;
          padding: 1.5rem;
          border-left: 4px solid;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .issue-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transform: translateX(4px);
        }

        .issue-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .issue-title {
          flex: 1;
        }

        .issue-severity {
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: white;
        }

        .issue-description {
          color: light-dark(#475569, #cbd5e1);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .issue-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: light-dark(#64748b, #94a3b8);
          flex-wrap: wrap;
        }

        .issue-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .issue-details {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid light-dark(#e2e8f0, #334155);
        }

        .suggestion-box {
          background: light-dark(#f0fdf4, #14532d);
          border-left: 3px solid #10b981;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .suggestion-title {
          font-weight: 600;
          color: #10b981;
          margin-bottom: 0.5rem;
        }

        .code-snippet {
          background: light-dark(#1e293b, #0f172a);
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin-top: 0.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: light-dark(#64748b, #94a3b8);
        }

        .empty-state svg {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          opacity: 0.5;
        }

        @media (max-width: 640px) {
          .accessibility-checker {
            padding: 1rem;
          }

          .checker-header h2 {
            font-size: 2rem;
          }

          .scan-controls {
            flex-direction: column;
          }

          .btn-scan {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .btn-scan,
          .issue-card,
          .spinner {
            animation: none !important;
            transition: none !important;
          }

          .btn-scan:hover,
          .issue-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      <div className="checker-header">
        <h2>AI Accessibility Checker</h2>
        <p>
          Escanea tu sitio web para detectar problemas de accesibilidad WCAG 2.1 Level AA
          y recibe recomendaciones impulsadas por IA.
        </p>
      </div>

      <div className="scan-controls">
        <button
          className="btn-scan btn-primary"
          onClick={runScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <>
              <div className="spinner" />
              Escaneando...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
              </svg>
              Escanear Página
            </>
          )}
        </button>

        {scanResult && (
          <button
            className="btn-scan btn-secondary"
            onClick={exportReport}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/>
            </svg>
            Exportar Reporte
          </button>
        )}
      </div>

      {scanResult && (
        <div className="scan-results">
          <div className="score-card">
            <div className="score-circle">
              <svg width="150" height="150">
                <circle
                  cx="75"
                  cy="75"
                  r="65"
                  fill="none"
                  stroke="light-dark(#e2e8f0, #334155)"
                  strokeWidth="10"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="65"
                  fill="none"
                  stroke={getScoreColor(scanResult.score)}
                  strokeWidth="10"
                  strokeDasharray={`${(scanResult.score / 100) * 408.4} 408.4`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="score-value" style={{ color: getScoreColor(scanResult.score) }}>
                {scanResult.score}
              </div>
            </div>
            <div className="score-label">Puntuación de Accesibilidad</div>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value" style={{ color: '#ef4444' }}>{scanResult.critical}</div>
                <div className="stat-label">Críticos</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: '#f97316' }}>{scanResult.serious}</div>
                <div className="stat-label">Serios</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: '#eab308' }}>{scanResult.moderate}</div>
                <div className="stat-label">Moderados</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: '#3b82f6' }}>{scanResult.minor}</div>
                <div className="stat-label">Menores</div>
              </div>
            </div>
          </div>

          {scanResult.totalIssues > 0 ? (
            <div className="issues-section">
              <h3 className="section-title">
                {scanResult.totalIssues} {scanResult.totalIssues === 1 ? 'Problema' : 'Problemas'} Detectados
              </h3>

              <div className="issues-list">
                {scanResult.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="issue-card"
                    style={{ borderLeftColor: getSeverityColor(issue.severity) }}
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                  >
                    <div className="issue-header">
                      <div className="issue-title">
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'light-dark(#1e293b, #f1f5f9)' }}>
                          {issue.issue}
                        </h4>
                      </div>
                      <div
                        className="issue-severity"
                        style={{ backgroundColor: getSeverityColor(issue.severity) }}
                      >
                        {issue.severity}
                      </div>
                    </div>

                    <div className="issue-meta">
                      <div className="issue-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        WCAG {issue.wcagLevel}
                      </div>
                      <div className="issue-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
                        </svg>
                        {issue.element}
                      </div>
                      {issue.location && (
                        <div className="issue-meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {issue.location.substring(0, 40)}{issue.location.length > 40 ? '...' : ''}
                        </div>
                      )}
                    </div>

                    {selectedIssue === issue.id && (
                      <div className="issue-details">
                        <div className="suggestion-box">
                          <div className="suggestion-title">✓ Sugerencia de Corrección</div>
                          <p style={{ margin: '0.5rem 0 0', color: 'light-dark(#166534, #86efac)' }}>
                            {issue.suggestion}
                          </p>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                          <strong style={{ color: 'light-dark(#1e293b, #f1f5f9)' }}>
                            Criterio WCAG:
                          </strong>{' '}
                          <span style={{ color: 'light-dark(#475569, #cbd5e1)' }}>
                            {issue.wcagCriterion}
                          </span>
                        </div>

                        {issue.id.startsWith('img-alt') && (
                          <button
                            className="btn-scan btn-primary"
                            style={{ marginTop: '1rem', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (issue.location) {
                                generateAltText(issue.location);
                              }
                            }}
                            disabled={generatingAltText}
                          >
                            {generatingAltText ? (
                              <>
                                <div className="spinner" />
                                Generando...
                              </>
                            ) : (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                </svg>
                                Generar Alt Text con IA
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h3>¡Excelente!</h3>
              <p>No se detectaron problemas de accesibilidad en esta página.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
