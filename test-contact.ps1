$url = 'http://localhost:3000/send-contact'
$body = @{
    name = 'PS Tester'
    email = 'tester@example.com'
    reason = 'PowerShell test'
    message = 'This is a quick test from PowerShell.'
} | ConvertTo-Json

try {
    $resp = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType 'application/json'
    Write-Output "Response: $($resp | ConvertTo-Json -Depth 5)"
} catch {
    Write-Error "Request failed: $_"
}
