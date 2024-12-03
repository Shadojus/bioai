# Create necessary directories
$directories = @(
    "src/lib/wearables",
    "src/app/api/garmin/login",
    "src/app/api/garmin/metrics/current",
    "src/app/api/garmin/metrics/historical",
    "src/app/garmin-login"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
    Write-Host "Created directory: $dir"
}

# Remove old files if they exist
$oldFiles = @(
    "src/pages/api/garmin/login.ts",
    "src/pages/api/garmin/metrics/current.ts",
    "src/pages/api/garmin/metrics/historical.ts"
)

foreach ($file in $oldFiles) {
    if (Test-Path $file) {
        Remove-Item $file
        Write-Host "Removed old file: $file"
    }
}

# Create new files
$garminServiceContent = Get-Content -Path "garmin-service-content.txt" -Raw
Set-Content -Path "src/lib/wearables/garmin-service.ts" -Value $garminServiceContent

$loginRouteContent = Get-Content -Path "login-route-content.txt" -Raw
Set-Content -Path "src/app/api/garmin/login/route.ts" -Value $loginRouteContent

$currentMetricsContent = Get-Content -Path "current-metrics-content.txt" -Raw
Set-Content -Path "src/app/api/garmin/metrics/current/route.ts" -Value $currentMetricsContent

$historicalMetricsContent = Get-Content -Path "historical-metrics-content.txt" -Raw
Set-Content -Path "src/app/api/garmin/metrics/historical/route.ts" -Value $historicalMetricsContent

$loginPageContent = Get-Content -Path "login-page-content.txt" -Raw
Set-Content -Path "src/app/garmin-login/page.tsx" -Value $loginPageContent

Write-Host "Files created successfully!"
Write-Host "Please run 'npm install garmin-connect' to install required dependencies"
