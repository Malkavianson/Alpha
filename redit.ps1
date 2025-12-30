# Extensões desejadas
$extensoes = @("*.js","*.ts", "*.jsx", "*.json", "*.prisma")

# Pasta atual
$raiz = "."

# Arquivo de saída
$saida = ".\saida.txt"

# Limpa o arquivo de saída se já existir
Remove-Item $saida -ErrorAction SilentlyContinue

# Pastas a excluir
$excluir = @("node_modules","dist",".git", ".env")

# Lista todos os arquivos válidos
$arquivos = Get-ChildItem -Path $raiz -Recurse -File -Include $extensoes |
    Where-Object { $_.FullName -notmatch "\\($($excluir -join '|'))\\" }

$total = $arquivos.Count
$contador = 0

foreach ($arquivo in $arquivos) {
    $contador++

    # Calcula porcentagem
    $percent = [math]::Round(($contador / $total) * 100)

    # Calcula tamanho da barra (20 blocos)
    $blocos = [math]::Round(($percent / 100) * 20)
    $barra = ("#" * $blocos).PadRight(20,"-")

    # Mostra progresso visual
    Write-Host ("[{0}] {1}% " -f $barra, $percent)
    Write-Host ("[{0}/{1}] - {2}" -f $contador, $total, $arquivo.FullName)

    # Escreve no arquivo de saída
    Add-Content -Path $saida -Value ("// " + $arquivo.FullName)
    Get-Content $arquivo.FullName | Add-Content -Path $saida
    Add-Content -Path $saida -Value "`n"
}
