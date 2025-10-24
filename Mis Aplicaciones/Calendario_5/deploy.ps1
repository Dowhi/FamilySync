# Script de despliegue para GitHub Pages
Write-Host "🚀 Desplegando CalendarioSync a GitHub Pages..." -ForegroundColor Green

try {
    # Build para GitHub Pages
    Write-Host "📦 Construyendo la aplicación..." -ForegroundColor Yellow
    npm run build:github

    # Verificar que el directorio dist existe
    if (!(Test-Path "dist")) {
        Write-Host "❌ Error: Directorio dist no encontrado" -ForegroundColor Red
        exit 1
    }

    # Crear archivo .nojekyll para GitHub Pages
    New-Item -Path "dist/.nojekyll" -ItemType File -Force

    # Crear archivo CNAME si existe
    if (Test-Path "public/CNAME") {
        Copy-Item "public/CNAME" "dist/CNAME"
    }

    Write-Host "✅ Build completado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Pasos siguientes:" -ForegroundColor Cyan
    Write-Host "1. Ve a tu repositorio en GitHub" -ForegroundColor White
    Write-Host "2. Ve a Settings > Pages" -ForegroundColor White
    Write-Host "3. En 'Source', selecciona 'Deploy from a branch'" -ForegroundColor White
    Write-Host "4. Selecciona la rama 'gh-pages' y la carpeta '/ (root)'" -ForegroundColor White
    Write-Host "5. Haz clic en 'Save'" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Tu aplicación estará disponible en:" -ForegroundColor Cyan
    Write-Host "https://dowhi.github.io/Calendario_5/" -ForegroundColor Yellow

} catch {
    Write-Host "❌ Error durante el despliegue: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
