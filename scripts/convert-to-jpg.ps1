param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile($InputPath)
try {
  $image.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
} finally {
  $image.Dispose()
}
