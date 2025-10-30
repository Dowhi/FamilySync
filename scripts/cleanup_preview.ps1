Param(
  [switch]$IncludeDocs,
  [switch]$IncludeCanvaskit
)

Write-Host "Vista previa de limpieza (no borra nada)" -ForegroundColor Cyan

# CANDIDATES (se puede ampliar)
$candidates = @(
  ".dart_tool",
  ".gradle",
  "build"
)
if ($IncludeCanvaskit) { $candidates += "canvaskit" }
if ($IncludeDocs) { $candidates += "docs" }

# PROTECTED
$protected = @("web","lib","scripts","ios","android")

function Get-DirSize($path){
  if (-not (Test-Path $path)) { return 0 }
  (Get-ChildItem -LiteralPath $path -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
}

$report = @()
foreach($p in $candidates){
  $size = Get-DirSize $p
  $report += [pscustomobject]@{ Path=$p; Exists=(Test-Path $p); SizeMB = [math]::Round($size/1MB,2); Protected=($protected -contains $p) }
}

$report | Sort-Object -Property SizeMB -Descending | Format-Table -AutoSize

Write-Host ""
Write-Host "Sugerencias:" -ForegroundColor Yellow
Write-Host "- Si publicas con GitHub Pages desde docs/, no borres 'docs/'"
Write-Host "- '.dart_tool', '.gradle' y 'build' son recreables (pueden borrarse)"
Write-Host "- 'canvaskit/' es recreable si sirves Flutter web con CDN o build nuevo"
