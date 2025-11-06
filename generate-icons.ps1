# PowerShell script to generate PWA icons
# Requires .NET Framework

Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param(
        [int]$Size,
        [string]$OutputPath
    )
    
    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Set high quality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    
    # Fill background with black
    $graphics.Clear([System.Drawing.Color]::Black)
    
    # Draw white "A" in center
    $font = New-Object System.Drawing.Font("Arial", ($Size * 0.6), [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    
    $graphics.DrawString("A", $font, $brush, ($Size / 2), ($Size / 2), $format)
    
    # Save as PNG
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    $font.Dispose()
    $brush.Dispose()
}

# Create icons directory if it doesn't exist
if (-not (Test-Path "icons")) {
    New-Item -ItemType Directory -Path "icons" | Out-Null
}

# Generate icons
Write-Host "Generating 192x192 icon..."
Create-Icon -Size 192 -OutputPath "icons\icon-192x192.png"

Write-Host "Generating 512x512 icon..."
Create-Icon -Size 512 -OutputPath "icons\icon-512x512.png"

Write-Host "Icons generated successfully!"

