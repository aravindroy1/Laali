Add-Type -AssemblyName System.Drawing
Write-Host "--- Private Photos ---"
Get-ChildItem src/assets/private_photos/* | Where-Object { $_.Extension -match "(?i)\.jpe?g|\.png" } | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host $_.Name ":" $img.Width "x" $img.Height
    $img.Dispose()
}
Write-Host "--- Public Photos ---"
Get-ChildItem src/assets/public_photos/* | Where-Object { $_.Extension -match "(?i)\.jpe?g|\.png" } | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host $_.Name ":" $img.Width "x" $img.Height
    $img.Dispose()
}
