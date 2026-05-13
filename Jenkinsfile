pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: playwright
    image: mcr.microsoft.com/playwright:v1.57.0-noble
    command:
    - cat
    tty: true
    resources:
      requests:
        memory: "1Gi"
        cpu: "500m"
      limits:
        memory: "2Gi"
        cpu: "1000m"
"""
        }
    }

    parameters {
        string(
            name: 'TAG',
            defaultValue: '@happy_path',
            description: 'Tag de Cucumber a ejecutar (ej: @happy_path, @smoke, @regression)'
        )
        choice(
            name: 'Ambiente',
            choices: ['URL1', 'URL2', 'URL3', 'URL4'],
            description: 'Ambiente a ejecutar'
        )
        choice(
            name: 'NAVEGADOR',
            choices: ['CHROMIUM', 'firefox', 'webkit'],
            description: 'Navegador a usar'
        )
    }

    environment {
        TAG           = "${params.TAG}"
        URL           = "${params.URL}"
        NAVEGADOR     = "${params.NAVEGADOR}"
        MODOHEADLESS  = 'SI'   
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                container('playwright') {
                    sh 'npm ci'
                }
            }
        }

        stage('Ejecutar tests E2E') {
            steps {
                container('playwright') {
                    sh """
                        npm run test:e2e -- --tags '${params.TAG}'
                    """
                }
            }
        }

        stage('Generar reporte') {
            steps {
                container('playwright') {
                    sh 'npm run report'
                }
            }
        }
    }

    post {
        always {
            // Publica el reporte HTML en Jenkins
            publishHTML([
                allowMissing         : false,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'reports/html',
                reportFiles          : 'index.html',
                reportName           : 'Cucumber Report'
            ])

            // Archiva el JSON como artefacto
            archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
        }

        success {
            echo "✅ Tests pasaron con tag: ${params.TAG} en ${params.URL}"
        }

        failure {
            echo "❌ Tests fallaron con tag: ${params.TAG} en ${params.URL}"
        }
    }
}