Param(
  [switch]$IncludeDocs,
  [switch]$IncludeCanvaskit,
  [switch]$Yes
)

$candidates = @(
  ".dart_tool",
  ".gradle",
  "build"
)
if ($IncludeCanvaskit) { $candidates += "canvaskit" }
if ($IncludeDocs) { $candidates += "docs" }

Write-Host "Los siguientes directorios serán ELIMINADOS si existen:" -ForegroundColor Yellow
$candidates | ForEach-Object { Write-Host " - $_" }

if (-not $Yes) {
  $resp = Read-Host "¿Continuar? (yes/no)"
  if ($resp -ne "yes") { Write-Host "Cancelado"; exit 0 }
}

foreach($p in $candidates){
  if (Test-Path $p) {
    try {
      Remove-Item -LiteralPath $p -Recurse -Force -ErrorAction Stop
      Write-Host "Eliminado: $p" -ForegroundColor Green
    } catch {
      Write-Host "No se pudo eliminar $p: $($_.Exception.Message)" -ForegroundColor Red
    }
  } else {
    Write-Host "No existe: $p" -ForegroundColor DarkGray
  }
}
