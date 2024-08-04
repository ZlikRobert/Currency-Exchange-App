document.addEventListener('DOMContentLoaded', function() {
    // Fetches exchange rates from the API
    fetch('/api/rates')
        .then(response => response.json())
        .then(data => {
            const rates = data.rates; // Stores exchange rates

            // Maps currency codes to country codes for flags
            const countryCodes = {
                "USD": "us", "EUR": "eu", "GBP": "gb", "JPY": "jp", "AUD": "au", "CAD": "ca",
                "CHF": "ch", "CNY": "cn", "SEK": "se", "NZD": "nz", "AED": "ae", "AFN": "af",
                "ALL": "al", "AMD": "am", "ANG": "an", "AOA": "ao", "ARS": "ar", "AWG": "aw",
                "AZN": "az", "BAM": "ba", "BBD": "bb", "BDT": "bd", "BGN": "bg", "BHD": "bh",
                "BIF": "bi", "BMD": "bm", "BND": "bn", "BOB": "bo", "BRL": "br", "BSD": "bs",
                "BTN": "bt", "BWP": "bw", "BYN": "by", "BZD": "bz", "CDF": "cd", "CLP": "cl",
                "COP": "co", "CRC": "cr", "CUP": "cu", "CVE": "cv", "CZK": "cz", "DJF": "dj",
                "DKK": "dk", "DOP": "do", "DZD": "dz", "EGP": "eg", "ERN": "er", "ETB": "et",
                "FJD": "fj", "FKP": "fk", "FOK": "fo", "GEL": "ge", "GGP": "gg", "GHS": "gh",
                "GIP": "gi", "GMD": "gm", "GNF": "gn", "GTQ": "gt", "GYD": "gy", "HKD": "hk",
                "HNL": "hn", "HRK": "hr", "HTG": "ht", "HUF": "hu", "IDR": "id", "ILS": "il",
                "IMP": "im", "INR": "in", "IQD": "iq", "IRR": "ir", "ISK": "is", "JEP": "je",
                "JMD": "jm", "JOD": "jo", "KES": "ke", "KGS": "kg", "KHR": "kh", "KID": "ki",
                "KMF": "km", "KRW": "kr", "KWD": "kw", "KYD": "ky", "KZT": "kz", "LAK": "la",
                "LBP": "lb", "LKR": "lk", "LRD": "lr", "LSL": "ls", "LYD": "ly", "MAD": "ma",
                "MDL": "md", "MGA": "mg", "MKD": "mk", "MMK": "mm", "MNT": "mn", "MOP": "mo",
                "MRU": "mr", "MUR": "mu", "MVR": "mv", "MWK": "mw", "MXN": "mx", "MYR": "my",
                "MZN": "mz", "NAD": "na", "NGN": "ng", "NIO": "ni", "NOK": "no", "NPR": "np",
                "OMR": "om", "PAB": "pa", "PEN": "pe", "PGK": "pg", "PHP": "ph", "PKR": "pk",
                "PLN": "pl", "PYG": "py", "QAR": "qa", "RON": "ro", "RSD": "rs", "RUB": "ru",
                "RWF": "rw", "SAR": "sa", "SBD": "sb", "SCR": "sc", "SDG": "sd", "SGD": "sg",
                "SHP": "sh", "SLL": "sl", "SOS": "so", "SRD": "sr", "SSP": "ss", "STN": "st",
                "SYP": "sy", "SZL": "sz", "THB": "th", "TJS": "tj", "TMT": "tm", "TND": "tn",
                "TOP": "to", "TRY": "tr", "TTD": "tt", "TVD": "tv", "TWD": "tw", "TZS": "tz",
                "UAH": "ua", "UGX": "ug", "UYU": "uy", "UZS": "uz", "VES": "ve", "VND": "vn",
                "VUV": "vu", "WST": "ws", "XAF": "cm", "XCD": "ag", "XDR": "un", "XOF": "sn",
                "XPF": "pf", "YER": "ye", "ZAR": "za", "ZMW": "zm", "ZWL": "zw"
            };

            // Maps currency codes to country names
            const countryNames = {
                "USD": "United States", "EUR": "European Union", "GBP": "United Kingdom", "JPY": "Japan", 
                "AUD": "Australia", "CAD": "Canada", "CHF": "Switzerland", "CNY": "China", "SEK": "Sweden", 
                "NZD": "New Zealand", "AED": "United Arab Emirates", "AFN": "Afghanistan", "ALL": "Albania", 
                "AMD": "Armenia", "ANG": "Netherlands Antilles", "AOA": "Angola", "ARS": "Argentina", 
                "AWG": "Aruba", "AZN": "Azerbaijan", "BAM": "Bosnia and Herzegovina", "BBD": "Barbados", 
                "BDT": "Bangladesh", "BGN": "Bulgaria", "BHD": "Bahrain", "BIF": "Burundi", "BMD": "Bermuda", 
                "BND": "Brunei", "BOB": "Bolivia", "BRL": "Brazil", "BSD": "Bahamas", "BTN": "Bhutan", 
                "BWP": "Botswana", "BYN": "Belarus", "BZD": "Belize", "CDF": "Congo", "CLP": "Chile", 
                "COP": "Colombia", "CRC": "Costa Rica", "CUP": "Cuba", "CVE": "Cape Verde", "CZK": "Czech Republic", 
                "DJF": "Djibouti", "DKK": "Denmark", "DOP": "Dominican Republic", "DZD": "Algeria", 
                "EGP": "Egypt", "ERN": "Eritrea", "ETB": "Ethiopia", "FJD": "Fiji", "FKP": "Falkland Islands", 
                "FOK": "Faroe Islands", "GEL": "Georgia", "GGP": "Guernsey", "GHS": "Ghana", "GIP": "Gibraltar", 
                "GMD": "Gambia", "GNF": "Guinea", "GTQ": "Guatemala", "GYD": "Guyana", "HKD": "Hong Kong", 
                "HNL": "Honduras", "HRK": "Croatia", "HTG": "Haiti", "HUF": "Hungary", "IDR": "Indonesia", 
                "ILS": "Israel", "IMP": "Isle of Man", "INR": "India", "IQD": "Iraq", "IRR": "Iran", 
                "ISK": "Iceland", "JEP": "Jersey", "JMD": "Jamaica", "JOD": "Jordan", "KES": "Kenya", 
                "KGS": "Kyrgyzstan", "KHR": "Cambodia", "KID": "Kiribati", "KMF": "Comoros", "KRW": "South Korea", 
                "KWD": "Kuwait", "KYD": "Cayman Islands", "KZT": "Kazakhstan", "LAK": "Laos", "LBP": "Lebanon", 
                "LKR": "Sri Lanka", "LRD": "Liberia", "LSL": "Lesotho", "LYD": "Libya", "MAD": "Morocco", 
                "MDL": "Moldova", "MGA": "Madagascar", "MKD": "North Macedonia", "MMK": "Myanmar", 
                "MNT": "Mongolia", "MOP": "Macau", "MRU": "Mauritania", "MUR": "Mauritius", "MVR": "Maldives", 
                "MWK": "Malawi", "MXN": "Mexico", "MYR": "Malaysia", "MZN": "Mozambique", "NAD": "Namibia", 
                "NGN": "Nigeria", "NIO": "Nicaragua", "NOK": "Norway", "NPR": "Nepal", "OMR": "Oman", 
                "PAB": "Panama", "PEN": "Peru", "PGK": "Papua New Guinea", "PHP": "Philippines", "PKR": "Pakistan", 
                "PLN": "Poland", "PYG": "Paraguay", "QAR": "Qatar", "RON": "Romania", "RSD": "Serbia", 
                "RUB": "Russia", "RWF": "Rwanda", "SAR": "Saudi Arabia", "SBD": "Solomon Islands", 
                "SCR": "Seychelles", "SDG": "Sudan", "SGD": "Singapore", "SHP": "Saint Helena", "SLL": "Sierra Leone", 
                "SOS": "Somalia", "SRD": "Suriname", "SSP": "South Sudan", "STN": "Sao Tome and Principe", 
                "SYP": "Syria", "SZL": "Eswatini", "THB": "Thailand", "TJS": "Tajikistan", "TMT": "Turkmenistan", 
                "TND": "Tunisia", "TOP": "Tonga", "TRY": "Turkey", "TTD": "Trinidad and Tobago", "TVD": "Tuvalu", 
                "TWD": "Taiwan", "TZS": "Tanzania", "UAH": "Ukraine", "UGX": "Uganda", "UYU": "Uruguay", 
                "UZS": "Uzbekistan", "VES": "Venezuela", "VND": "Vietnam", "VUV": "Vanuatu", "WST": "Samoa", 
                "XAF": "Central African CFA", "XCD": "East Caribbean", "XDR": "IMF", "XOF": "West African CFA", 
                "XPF": "CFP Franc", "YER": "Yemen", "ZAR": "South Africa", "ZMW": "Zambia", "ZWL": "Zimbabwe"
            };

            // Get references to DOM elements
            const fromCurrencySelect = document.getElementById('fromCurrencySelect');
            const toCurrencySelect = document.getElementById('toCurrencySelect');
            const fromCurrencyOptions = document.getElementById('fromCurrencyOptions');
            const toCurrencyOptions = document.getElementById('toCurrencyOptions');
            const fromCurrencyText = document.getElementById('fromCurrencyText');
            const toCurrencyText = document.getElementById('toCurrencyText');
            const fromCurrencyFlag = document.getElementById('fromCurrencyFlag');
            const toCurrencyFlag = document.getElementById('toCurrencyFlag');

            // Creates options for the currency selector
            function createOption(currency) {
                const option = document.createElement('div');
                option.className = 'custom-option'; // Sets the class for the option
                const countryCode = countryCodes[currency]; // Gets the country code for the currency
                const countryName = countryNames[currency] || 'Unknown'; // Gets the country name or sets to 'Unknown'
                if (countryCode) {
                    // If there is a country code, creates an option with the flag
                    option.innerHTML = `<img src="https://flagcdn.com/20x15/${countryCode}.png" class="flag-icon"> ${currency} (${countryName})`;
                } else {
                    // If there is no country code, creates an option without the flag
                    option.textContent = `${currency} (${countryName})`;
                }
                return option;
            }

            // Populates the options for the currency selectors
            function populateOptions(selectElement, optionsContainer, triggerText, triggerFlag) {
                for (const currency in rates) {
                    const option = createOption(currency);
                    option.addEventListener('click', function() {
                        selectElement.value = currency;
                        triggerText.textContent = `${currency} (${countryNames[currency] || 'Unknown'})`;
                        if (countryCodes[currency]) {
                            triggerFlag.src = `https://flagcdn.com/20x15/${countryCodes[currency]}.png`;
                            triggerFlag.alt = currency;
                            triggerFlag.style.display = 'inline-block';
                        } else {
                            triggerFlag.src = '';
                            triggerFlag.alt = '';
                            triggerFlag.style.display = 'none';
                        }
                        optionsContainer.classList.remove('open');
                    });
                    optionsContainer.appendChild(option);
                }
            }

            // Populates the options for both selectors
            populateOptions(fromCurrencySelect, fromCurrencyOptions, fromCurrencyText, fromCurrencyFlag);
            populateOptions(toCurrencySelect, toCurrencyOptions, toCurrencyText, toCurrencyFlag);

            // Adds click event handling for expanding and collapsing the currency selector
            document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
                const searchInput = wrapper.querySelector('.search-input');
                const selectTrigger = wrapper.querySelector('.custom-select-trigger');

                wrapper.addEventListener('click', function(e) {
                    if (e.target !== searchInput) {
                        this.querySelector('.custom-select').classList.toggle('open');
                        if (this.querySelector('.custom-select').classList.contains('open')) {
                            searchInput.focus();
                        }
                    }
                });

                searchInput.addEventListener('click', function(e) {
                    e.stopPropagation();
                });

                searchInput.addEventListener('input', function() {
                    const filter = this.value.toLowerCase();
                    const options = this.nextElementSibling.children;
                    Array.from(options).forEach(option => {
                        const text = option.textContent.toLowerCase();
                        option.style.display = text.includes(filter) ? '' : 'none';
                    });
                });
            });

            // Closes the currency selector when clicking outside of it
            document.addEventListener('click', function(e) {
                const selectWrappers = document.querySelectorAll('.custom-select-wrapper');
                selectWrappers.forEach(wrapper => {
                    if (!wrapper.contains(e.target)) {
                        wrapper.querySelector('.custom-select').classList.remove('open');
                    }
                });
            });

            // Adds click event handling for the "Convert" button
            document.getElementById('convertButton').addEventListener('click', function() {
                const amount = parseFloat(document.getElementById('amount').value); // Gets the amount to convert
                const fromCurrency = fromCurrencyText.textContent.split(' ')[0]; // Gets the base currency code
                const toCurrency = toCurrencyText.textContent.split(' ')[0]; // Gets the target currency code

                // Checks if all fields are filled in correctly
                if (isNaN(amount) || !fromCurrency || !toCurrency || fromCurrency === 'Select currency' || toCurrency === 'Select currency') {
                    document.getElementById('result').textContent = 'Please fill in all fields.';
                    return;
                }

                // Calculates the converted amount
                const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
                document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

                // Changes images after conversion
                document.getElementById('leftImage').src = 'images/AFTER.webp';
                document.getElementById('rightImage').src = 'images/AFTER.webp';
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Logs error to the console
            document.getElementById('result').textContent = 'Error fetching exchange rates.'; // Displays error on the page
        });
});
