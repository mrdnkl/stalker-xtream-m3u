// STALKER PORTAL-XTREAM-M3U 
// 1. LIGHTWEIGHT MD5 IMPLEMENTATION (For Cloudflare Workers compatibility)
function md5(string)  {
  function rotateLeft(lValue, iShiftBits)  {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY)  {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4)  {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    } else return (lResult ^ lX8 ^ lY8);
  }
  function F(x, y, z)  {
    return (x & y) | ((~x) & z);
  }
  function G(x, y, z)  {
    return (x & z) | (y & (~z));
  }
  function H(x, y, z)  {
    return (x ^ y ^ z);
  }
  function I(x, y, z)  {
    return (y ^ (x | (~z)));
  }
  function FF(a, b, c, d, x, s, ac)  {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac)  {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac)  {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac)  {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function convertToWordArray(string)  {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength)  {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function wordToHex(lValue)  {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++)  {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  x = convertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16)  {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}
// Replace non-working WebCrypto MD5 call with our custom function
async function hash(str)  {
  return md5(str);
           }
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stalker-Xtream-M3U</title>
    <style>
        :root {
            --bg: #0f172a; --card: #1e293b; --input: #334155;
            --text: #f1f5f9; --muted: #94a3b8; --accent: #06b6d4;
            --border: #475569; --tab-bg: #1e293b; --tab-active: #06b6d4;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; display: flex; justify-content: center; min-height: 100vh; }
        .container { width: 100%; max-width: 600px; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5); }
        h1 { margin-top: 0; font-size: 1.5rem; color: var(--accent); text-align: center; }
        .subtitle { color: var(--muted); font-size: 0.9rem; text-align: center; margin-bottom: 20px; }
        .tabs { display: flex; margin-bottom: 20px; border-bottom: 1px solid var(--border); }
        .tab-btn { flex: 1; padding: 12px; background: transparent; border: none; color: var(--muted); cursor: pointer; font-weight: bold; transition: 0.3s; border-bottom: 2px solid transparent; }
        .tab-btn:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .tab-btn.active { color: var(--tab-active); border-bottom: 2px solid var(--tab-active); }
        .form-section { display: none; animation: fadeIn 0.3s; }
        .form-section.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .input-group { margin-bottom: 15px; }
        label { display: block; font-size: 0.85rem; color: var(--muted); margin-bottom: 5px; }
        input, select { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--input); color: var(--text); box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: var(--accent); color: #000; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1rem; margin-top: 10px; transition: 0.2s; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button.btn-copy { background: #475569; color: #fff; margin-top: 10px; padding: 8px; font-size: 0.9rem; }
        .result { margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; display: none; border: 1px solid var(--accent); }
        .result-item { margin-bottom: 15px; }
        .result-item label { color: var(--accent); font-weight: bold; }
        .result a { color: var(--muted); word-break: break-all; text-decoration: none; display: block; margin-bottom: 5px; font-size: 0.9rem; }
        .result a:hover { text-decoration: underline; color: var(--text); }
        .note { font-size: 0.75rem; color: #f87171; margin-top: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>STALKER-XTREAM-M3U</h1>
            <p class="subtitle">Stalker • Xtream • Mac to M3U</p>
            <div class="tabs">
                <button class="tab-btn active" onclick="openTab('stalker')">Stalker</button>
                <button class="tab-btn" onclick="openTab('xtream')">Xtream</button>
                <button class="tab-btn" onclick="openTab('mac')">Mac</button>
            </div>
            <!-- STALKER FORM -->
            <div id="stalker" class="form-section active">
                <div class="input-group">
                    <label>Portal Host</label>
                    <input type="text" id="stalker_host" placeholder="255.255.255.255">
                </div>
                <div class="input-group">
                    <label>Portal Path</label>
                    <input type="text" id="stalker_path" placeholder="/stalker_portal/" value="/stalker_portal/">
                    <div class="note"><i>(Most servers use /stalker_portal/ or /c/. If API is at root, leave this empty or use /)</i></div>
                </div>
                <div class="input-group">
                    <label>MAC Address</label>
                    <input type="text" id="stalker_mac" placeholder="00:1B:79:XX:XX:XX">
                </div>
                <div class="input-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div><label>Device ID</label><input type="text" id="stalker_deviceId"></div>
                    <div><label>Device ID 2</label><input type="text" id="stalker_deviceId2"></div>
                </div>
                <div class="input-group">
                    <label>Serial Number</label>
                    <input type="text" id="stalker_serial">
                </div>
                <div class="input-group">
                    <label>STB Type</label>
                    <select id="stalker_type">
                        <option value="MAG250">MAG250</option>
                        <option value="MAG254">MAG254</option>
                        <option value="MAG324">MAG324</option>
                        <option value="MAG420">MAG420</option>
                    </select>
                </div>
                <button onclick="generateStalker()">Generate Links</button>
            </div>
            <!-- XTREAM FORM -->
            <div id="xtream" class="form-section">
                <div class="input-group">
                    <label>Host Name</label>
                    <input type="text" id="xtream_host" placeholder="example.com">
                </div>
                <div class="input-group">
                    <label>Username</label>
                    <input type="text" id="xtream_user" placeholder="Username">
                </div>
                <div class="input-group">
                    <label>Password</label>
                    <input type="text" id="xtream_pass" placeholder="Password">
                </div>
                <button onclick="generateXtream()">Generate Links</button>
            </div>
            <!-- MAC FORM -->
            <div id="mac" class="form-section">
                <div class="input-group">
                    <label>Full Portal URL</label>
                    <input type="text" id="mac_panel" placeholder="http://iptv-provider.com/c/">
                    <div class="note"><i>(e.g. http://255.255.255.255/stalker_portal/c/)</i></div>
                </div>
                <div class="input-group">
                    <label>MAC Address</label>
                    <input type="text" id="mac_addr" placeholder="00:1B:79:XX:XX:XX">
                </div>
                <button onclick="generateMac()">Generate Links</button>
            </div>
            <!-- RESULT BOX -->
            <div class="result" id="resultBox">
                <!-- Stalker Results -->
                <div id="res_stalker">
                    <div class="result-item">
                        <label>M3U Playlist:</label>
                        <a href="#" id="stalker_m3u" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('stalker_m3u')">Copy M3U</button>
                    </div>
                    <div class="result-item">
                        <label>EPG (XMLTV) Link:</label>
                        <a href="#" id="stalker_epg" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('stalker_epg')">Copy EPG</button>
                    </div>
                </div>
                <!-- Xtream Results -->
                <div id="res_xtream" style="display:none;">
                    <div class="info">M3U converted to Stalker format. Streams point to this Worker.</div>
                    <div class="result-item">
                        <label>Converted M3U Playlist:</label>
                        <a href="#" id="xtream_m3u" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('xtream_m3u')">Copy M3U</button>
                    </div>
                    <div class="result-item">
                        <label>EPG (XMLTV) Link:</label>
                        <a href="#" id="xtream_epg" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('xtream_epg')">Copy EPG</button>
                    </div>
                    <div class="result-item">
                        <label>Portal Link (For OTT Navigator):</label>
                        <div class="info" style="margin-bottom:5px">Use this if the M3U above doesn't load categories in OTT Navigator.</div>
                        <a href="#" id="xtream_api" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('xtream_api')">Copy Portal</button>
                    </div>
                </div>
                <!-- Mac Results -->
                <div id="res_mac" style="display:none;">
                    <div class="info">Auto-Generated M3U (Stalker Protocol)</div>
                    <div class="result-item">
                        <label>M3U Playlist:</label>
                        <a href="#" id="mac_m3u" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('mac_m3u')">Copy M3U</button>
                    </div>
                    <div class="result-item">
                        <label>EPG (XMLTV) Link:</label>
                        <a href="#" id="mac_epg" target="_blank">...</a>
                        <button class="btn-copy" onclick="copyText('mac_epg')">Copy EPG</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function openTab(tabName) {
            document.querySelectorAll('.form-section').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
            document.getElementById('resultBox').style.display = 'none';
        }
        function showResult(type, links) {
            document.getElementById('resultBox').style.display = 'block';
            document.getElementById('res_stalker').style.display = 'none';
            document.getElementById('res_xtream').style.display = 'none';
            document.getElementById('res_mac').style.display = 'none';
            if(type === 'stalker') {
                document.getElementById('res_stalker').style.display = 'block';
                document.getElementById('stalker_m3u').href = links.m3u;
                document.getElementById('stalker_m3u').innerText = links.m3u;
                document.getElementById('stalker_epg').href = links.epg;
                document.getElementById('stalker_epg').innerText = links.epg;
            } else if (type === 'xtream') {
                document.getElementById('res_xtream').style.display = 'block';
                document.getElementById('xtream_m3u').href = links.m3u;
                document.getElementById('xtream_m3u').innerText = links.m3u;
                document.getElementById('xtream_epg').href = links.epg;
                document.getElementById('xtream_epg').innerText = links.epg;
                document.getElementById('xtream_api').href = links.api;
                document.getElementById('xtream_api').innerText = links.api;
            } else if (type === 'mac') {
                document.getElementById('res_mac').style.display = 'block';
                document.getElementById('mac_m3u').href = links.m3u;
                document.getElementById('mac_m3u').innerText = links.m3u;
                document.getElementById('mac_epg').href = links.epg;
                document.getElementById('mac_epg').innerText = links.epg;
            }
        }
        function generateStalker() {
            const host = document.getElementById('stalker_host').value.trim();
            const path = document.getElementById('stalker_path').value.trim();
            const mac = document.getElementById('stalker_mac').value.trim();
            const serial = document.getElementById('stalker_serial').value.trim();
            const deviceId = document.getElementById('stalker_deviceId').value.trim();
            const deviceId2 = document.getElementById('stalker_deviceId2').value.trim();
            const stbType = document.getElementById('stalker_type').value;
            if (!host || !mac) { alert("Host and MAC required"); return; }
            const params = new URLSearchParams({ 
                host: host, path: path, mac: mac, serial: serial, 
                device_id: deviceId, device_id_2: deviceId2, stb_type: stbType 
            });
            const origin = window.location.origin;
            showResult('stalker', {
                m3u: origin + '/playlist.m3u8?' + params.toString(),
                epg: origin + '/epg.xml?' + params.toString()
            });
        }
        function generateXtream() {
            const host = document.getElementById('xtream_host').value.trim();
            const user = document.getElementById('xtream_user').value.trim();
            const pass = document.getElementById('xtream_pass').value.trim();
            if (!host || !user || !pass) { alert("All fields required"); return; }
            const params = new URLSearchParams({ host: host, username: user, password: pass });
            const origin = window.location.origin;
            const m3uLink = origin + '/xtream_convert?' + params.toString();
            const epgLink = origin + '/xtream_epg?' + params.toString();
            const apiLink = origin + '/xtream_api?' + params.toString();
            showResult('xtream', { m3u: m3uLink, epg: epgLink, api: apiLink });
        }
        function generateMac() {
            let panel = document.getElementById('mac_panel').value.trim();
            const mac = document.getElementById('mac_addr').value.trim();
            if (!panel || !mac) { alert("Panel URL and MAC required"); return; }
            if (!panel.endsWith('/')) panel += '/';
            const params = new URLSearchParams({ panel: panel, mac: mac });
            const origin = window.location.origin;
            showResult('mac', { 
                m3u: origin + '/mac.m3u?' + params.toString(), 
                epg: origin + '/mac_epg.xml?' + params.toString() 
            });
        }
        function copyText(elementId) {
            const text = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.activeElement;
                const original = btn.innerText;
                btn.innerText = "Copied!";
                setTimeout(() => btn.innerText = original, 2000);
            });
        }
    </script>
</body>
</html>
`;
// STALKER-XTREAM-M3U CONFIGURATION
const defaultStalkerConfig =  {
  host: '',
  path: '/stalker_portal/',
  mac_address: '',
  serial_number: '',
  device_id: '',
  device_id_2: '',
  stb_type: 'MAG250',
  api_signature: '263',
}
;
async function generateConfigFromMac(panelUrl, mac)  {
  try  {
    const urlObj = new URL(panelUrl);
    let host = urlObj.hostname;
    let path = urlObj.pathname;
    if (path.endsWith('/c/')) path = path.slice(0, -3);
    if (path === '' || path === '/') path = '/';
    const seed = mac.replace(/:/g, '');
    const serial = (await hash(mac)).substring(0, 16).toUpperCase();
    const deviceId = (await hash(seed + '1')).substring(0, 32);
    const deviceId2 = (await hash(seed + '2')).substring(0, 32);
    return  {
      host: host,
      path: path,
      mac_address: mac,
      serial_number: serial,
      device_id: deviceId,
      device_id_2: deviceId2,
      stb_type: 'MAG250',
      api_signature: '263'
    }
    ;
  } catch (e)  {
    return null;
  }
}
function getStalkerConfig(request)  {
  const url = new URL(request.url);
  const params = url.searchParams;
  let path = params.get('path') || defaultStalkerConfig.path;
  if (!path.startsWith('/')) path = '/' + path;
  if (path.endsWith('/')) path = path.slice(0, -1);
  return  {
    host: params.get('host') || defaultStalkerConfig.host,
    path: path,
    mac_address: params.get('mac') || defaultStalkerConfig.mac_address,
    serial_number: params.get('serial') || defaultStalkerConfig.serial_number,
    device_id: params.get('device_id') || defaultStalkerConfig.device_id,
    device_id_2: params.get('device_id_2') || defaultStalkerConfig.device_id_2,
    stb_type: params.get('stb_type') || defaultStalkerConfig.stb_type,
    api_signature: params.get('api_signature') || defaultStalkerConfig.api_signature,
  }
  ;
}
function getRandomHex(length)  {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++)  {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
async function generateHardwareVersions(config)  {
  const hw = '1.7-BD-' + (await hash(config.mac_address)).substring(0, 2).toUpperCase();
  const hw2 = await hash(config.serial_number.toLowerCase() + config.mac_address.toLowerCase());
  config.hw_version = hw;
  config.hw_version_2 = hw2;
}
function getHeaders(config, token = '')  {
  const refererPath = config.path === '/' ? '/c/' : config.path + '/c/';
  return  {
    'Cookie': `mac=${config.mac_address}; stb_lang=en; timezone=GMT`,
    'Referer': `http://${config.host}${refererPath}`,
    'User-Agent': 'Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3',
    'X-User-Agent': `Model: ${config.stb_type}; Link: WiFi`,
    ...(token &&  {
      'Authorization': `Bearer ${token}`
    }
    )
  }
  ;
}
async function fetchStalkerToken(config)  {
  const url = `http://${config.host}${config.path}/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config)
    }
    );
    if (!response.ok) return '';
    const text = await response.text();
    return JSON.parse(text).js?.token || '';
  } catch (e)  {
    return '';
  }
}
async function authStalker(config, token)  {
  const metrics =  {
    mac: config.mac_address,
    sn: config.serial_number,
    model: config.stb_type,
    type: 'STB',
    uid: '',
    device: config.device_id,
    random: getRandomHex(32)
  }
  ;
  const metricsEncoded = encodeURIComponent(JSON.stringify(metrics));
  const timestamp = Math.floor(Date.now() / 1000);
  const verString = `ImageDescription:%200.2.18-r14-pub-250;%20ImageDate:%20${new Date().toUTCString().replace(/ /g, '%20')};%20PORTAL%20version:%205.5.0;%20API%20Version:%20JS%20API%20version:%20328;%20STB%20API%20version:%20134;%20Player%20Engine%20version:%200x566`;
  const url = `http://${config.host}${config.path}/server/load.php?type=stb&action=get_profile` +
  `&hd=1&ver=${verString}` +
  `&num_banks=2&sn=${config.serial_number}` +
  `&stb_type=${config.stb_type}&client_type=STB&image_version=218&video_out=hdmi` +
  `&device_id=${config.device_id}&device_id2=${config.device_id_2}` +
  `&signature=&auth_second_step=1&hw_version=${config.hw_version}` +
  `&not_valid_token=0&metrics=${metricsEncoded}` +
  `&hw_version_2=${config.hw_version_2}&api_signature=${config.api_signature}` +
  `&prehash=&timestamp=${timestamp}` +
  `&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config, token)
    }
    );
    if (!response.ok) return [];
    const text = await response.text();
    return JSON.parse(text).js || [];
  } catch (e)  {
    return [];
  }
}
async function handshakeStalker(config, token)  {
  const url = `http://${config.host}${config.path}/server/load.php?type=stb&action=handshake&token=${token}&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config)
    }
    );
    if (!response.ok) return '';
    const text = await response.text();
    return JSON.parse(text).js?.token || '';
  } catch (e)  {
    return '';
  }
}
async function getAccountInfo(config, token)  {
  const url = `http://${config.host}${config.path}/server/load.php?type=account_info&action=get_main_info&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config, token)
    }
    );
    if (!response.ok) return [];
    const text = await response.text();
    return JSON.parse(text).js || [];
  } catch (e)  {
    return [];
  }
}
async function getGenres(config, token)  {
  const url = `http://${config.host}${config.path}/server/load.php?type=itv&action=get_genres&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config, token)
    }
    );
    if (!response.ok) return [];
    const text = await response.text();
    return JSON.parse(text).js || [];
  } catch (e)  {
    return [];
  }
}
async function getStalkerStreamURL(config, token, id)  {
  const url = `http://${config.host}${config.path}/server/load.php?type=itv&action=create_link&cmd=ffrt%20http://localhost/ch/${id}&JsHttpRequest=1-xml`;
  try  {
    const response = await fetch(url,  {
      headers: getHeaders(config, token)
    }
    );
    if (!response.ok) return '';
    const text = await response.text();
    return JSON.parse(text).js?.cmd || '';
  } catch (e)  {
    return '';
  }
}
async function genStalkerToken(config)  {
  await generateHardwareVersions(config);
  const token = await fetchStalkerToken(config);
  if (!token) return  {
    token: '',
    profile: [],
    account_info: []
  }
  ;
  const profile = await authStalker(config, token);
  const newToken = await handshakeStalker(config, token);
  if (!newToken) return  {
    token: '',
    profile,
    account_info: []
  }
  ;
  const account_info = await getAccountInfo(config, newToken);
  return  {
    token: newToken,
    profile,
    account_info
  }
  ;
}
// Clean and normalize Logo URLs
function formatLogoUrl(logo, host, path)  {
  if (!logo) return '';
  if (logo.startsWith('http://') || logo.startsWith('https://'))  {
    return logo;
  }
  return `http://${host}${path}/misc/logos/320/${logo}`;
}
// Extract clean Stream URL from Stalker cmd string
function cleanStreamCmd(cmd)  {
  if (!cmd) return '';
  let cleanUrl = cmd.trim();
  cleanUrl = cleanUrl.replace(/^(ffmpeg|ffrt|auto)\s+/, '');
  cleanUrl = cleanUrl.replace(/([?&])play_token=[^&]*&?/, '$1');
  cleanUrl = cleanUrl.replace(/[?&]$/, '');
  return cleanUrl;
}
async function convertJsonToM3U(channels, config, requestUrl)  {
  const urlObj = new URL(requestUrl);
  const searchString = urlObj.search;
  const origin = urlObj.origin;
  const epgRoute = urlObj.pathname.includes('mac') ? '/mac_epg.xml' : '/epg.xml';
  const epgUrl = `${origin}${epgRoute}${searchString}`;
  let m3u = [
  `#EXTM3U`,
  `# Total Channels => ${channels.length}`,
  '# Stalker Playlist M3U Converted', ''
  ];
  if (!channels.length) return m3u.join('\n');
  channels.forEach(channel =>  {
    const logo_url = formatLogoUrl(channel.logo, config.host, config.path);
    let raw_cmd = channel.cmd || '';
    let clean_url = cleanStreamCmd(raw_cmd);
    let channel_stream_url = '';
    if (clean_url.includes('http://localhost/ch/'))  {
      const streamId = clean_url.replace('http://localhost/ch/', '');
      channel_stream_url = `${origin}/${streamId}.m3u8${searchString}`;
    } else  {
      channel_stream_url = clean_url;
    }
    m3u.push(`#EXTINF:-1 tvg-id="${channel.tvgid}" tvg-name="${channel.name}" tvg-logo="${logo_url}" group-title="${channel.title}",${channel.name}`);
    m3u.push(channel_stream_url);
  }
  );
  return m3u.join('\n');
}
export default  {
  async fetch(request, env, ctx)  {
    return handleRequest(request);
  }
}
;
// CENTRAL ROUTER: handleRequest
async function handleRequest(request)  {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  // 1. SERVE FRONTEND HTML UI
  if (url.pathname === '/')  {
    return new Response(htmlContent,  {
      headers:  {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    }
    );
  }
  // 2. ROUTE: MAC M3U PLAYLIST
  if (url.pathname === '/mac.m3u')  {
    const panel = url.searchParams.get('panel');
    const mac = url.searchParams.get('mac');
    if (!panel || !mac) return new Response("Missing parameters.",  {
      status: 400
    }
    );
    const config = await generateConfigFromMac(panel, mac);
    if (!config) return new Response("Invalid Panel URL",  {
      status: 400
    }
    );
    const  {
      token
    }
    = await genStalkerToken(config);
    if (!token) return new Response("Auth Failed. Check MAC and Panel URL.",  {
      status: 500
    }
    );
    const channelsUrl = `http://${config.host}${config.path}/server/load.php?type=itv&action=get_all_channels&JsHttpRequest=1-xml`;
    let channelsData;
    try  {
      const response = await fetch(channelsUrl,  {
        headers: getHeaders(config, token)
      }
      );
      const text = await response.text();
      channelsData = JSON.parse(text);
    } catch (e)  {
      return new Response("Error fetching channels.",  {
        status: 500
      }
      );
    }
    const genresData = await getGenres(config, token);
    const genreMap =  {
    }
    ;
    if (Array.isArray(genresData))  {
      genresData.forEach(g =>  {
        if (g && g.id) genreMap[g.id] = g.title || 'Other';
      }
      );
    }
    let channels = (channelsData.js?.data || []).map(item => ( {
      name: item.name || 'Unknown',
      cmd: item.cmd || '',
      tvgid: item.xmltv_id || '',
      id: item.tv_genre_id || '',
      logo: item.logo || ''
    }
    )).map(c => ( {
      ...c,
      title: genreMap[c.id] || 'Other'
    }
    ));
    const m3uContent = await convertJsonToM3U(channels, config, url);
    return new Response(m3uContent,  {
      headers:  {
        'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8'
      }
    }
    );
  }
  // 3. ROUTE: MAC EPG
  if (url.pathname === '/mac_epg.xml')  {
    const panel = url.searchParams.get('panel');
    const mac = url.searchParams.get('mac');
    if (!panel || !mac) return new Response("Missing parameters.",  {
      status: 400
    }
    );
    const config = await generateConfigFromMac(panel, mac);
    const  {
      token
    }
    = await genStalkerToken(config);
    if (!token) return new Response("Auth Failed.",  {
      status: 500
    }
    );
    const basePath = `http://${config.host}${config.path}`;
    const possiblePaths = [
    `${basePath}/server/xmltv.php?token=${token}`,
    `${basePath}/server/xmltv.php`,
    `${basePath}/xmltv.php`,
    `${basePath}/../xmltv.php`,
    `http://${config.host}/xmltv.php`
    ];
    let epgText = null;
    for (const path of possiblePaths)  {
      try  {
        const response = await fetch(path,  {
          headers: getHeaders(config, token)
        }
        );
        if (response.ok)  {
          const text = await response.text();
          if (text.trim().startsWith('<?xml'))  {
            epgText = text;
            break;
          }
        }
      } catch (e)  {
      }
    }
    if (epgText)  {
      return new Response(epgText,  {
        headers:  {
          'Content-Type': 'text/xml; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
        ,
      }
      );
    } else  {
      return new Response("Could not find EPG file on server.",  {
        status: 404
      }
      );
    }
  }
  // 4. ROUTE: XTREAM CONVERT M3U (LIVE ONLY NO MOVIE)
  if (url.pathname === '/xtream_convert')  {
    let host = url.searchParams.get('host');
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    if (!host || !username || !password)  {
      return new Response("Missing parameters.",  {
        status: 400
      }
      );
    }
    if (!host.startsWith('http://') && !host.startsWith('https://'))  {
      host = 'http://' + host;
    }
    const cleanHost = host.replace(/\/+$/, '');
    const sourceUrl = `${cleanHost}/get.php?username=${username}&password=${password}&type=m3u_plus`;
    const origin = url.origin;
    const epgUrl = `${origin}/xtream_epg?host=${encodeURIComponent(cleanHost)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    try  {
      const response = await fetch(sourceUrl,  {
        headers:  {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        }
      }
      );
      if (!response.ok)  {
        return new Response(`Upstream Error: HTTP ${response.status}`,  {
          status: response.status
        }
        );
      }
      let pendingExtinf = '';
      // Temporary buffer for metadata line
      const  {
        readable, writable
      }
      = new TransformStream( {
        start(controller)  {
          controller.enqueue(new TextEncoder().encode(`#EXTM3U\n`));
          controller.enqueue(new TextEncoder().encode(`# Total Channels => ${channels.length}\n`));
          controller.enqueue(new TextEncoder().encode(`# Xtream Playlist M3U Converted\n\n`));
        }
        ,
        transform(chunk, controller)  {
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();
          const text = decoder.decode(chunk,  {
            stream: true
          }
          );
          const lines = text.split('\n');
          lines.forEach(line =>  {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#EXTINF'))  {
              pendingExtinf = trimmedLine;
              // Hold metadata until URL line is evaluated
            } else if (trimmedLine.startsWith('#') && !trimmedLine.startsWith('#EXTM3U'))  {
              controller.enqueue(encoder.encode(trimmedLine + '\n'));
            } else if (trimmedLine.length > 0)  {
              let streamId = '';
              let extension = 'm3u8';
              const match = trimmedLine.match(/\/(\d+)\.(m3u8|ts|mkv|mp4)/i);
              if (match)  {
                streamId = match[1];
                extension = match[2];
              } else  {
                const plainMatch = trimmedLine.match(/\/(\d+)$/);
                if (plainMatch) streamId = plainMatch[1];
              }
              // Identify movie content via path or extensions
              const isMoviePath = trimmedLine.includes('/movie/');
              const isMovieExt = ['mkv', 'mp4', 'avi'].includes(extension.toLowerCase());
              if (isMoviePath || isMovieExt)  {
                // SKIP MOVIE: Clear metadata buffer without sending to client
                pendingExtinf = '';
              } else  {
                // LIVE STREAM: Output pending metadata + direct stream URL
                if (pendingExtinf)  {
                  controller.enqueue(encoder.encode(pendingExtinf + '\n'));
                  pendingExtinf = '';
                }
                const streamType = 'live';
                const directUrl = streamId
                ? `${cleanHost}/${streamType}/${username}/${password}/${streamId}.${extension}`
                : trimmedLine;
                controller.enqueue(encoder.encode(directUrl + '\n'));
              }
            }
          }
          );
        }
      }
      );
      response.body.pipeTo(writable);
      return new Response(readable,  {
        headers:  {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8'
        }
      }
      );
    } catch (e)  {
      return new Response(`Error converting M3U: ${e.message}`,  {
        status: 500
      }
      );
    }
  }
  // 5. ROUTE: STREAM REDIRECTOR (LIVE ONLY NO MOVIE)
  if (lastPart.endsWith('.m3u8') && lastPart !== 'playlist.m3u8')  {
    const type = url.searchParams.get('type');
    if (type === 'xtream')  {
      let host = url.searchParams.get('host');
      const username = url.searchParams.get('username');
      const password = url.searchParams.get('password');
      const streamId = lastPart.replace('.m3u8', '');
      const ext = url.searchParams.get('ext') || 'm3u8';
      if (!host || !username || !password || !streamId)  {
        return new Response("Missing parameters for Xtream redirect.",  {
          status: 400
        }
        );
      }
      // Block attempts to stream movies through redirect route
      if (['mkv', 'mp4', 'avi'].includes(ext.toLowerCase()))  {
        return new Response("Movie stream redirect disabled.",  {
          status: 403
        }
        );
      }
      if (!host.startsWith('http://') && !host.startsWith('https://'))  {
        host = 'http://' + host;
      }
      const cleanHost = host.replace(/\/+$/, '');
      const streamType = 'live';
      // Construct direct provider URL: http://HOST/live/USERNAME/PASSWORD/STREAM_ID.m3u8
      const targetUrl = `${cleanHost}/${streamType}/${username}/${password}/${streamId}.${ext}`;
      return Response.redirect(targetUrl, 302);
    }
  }
  // 6. ROUTE: XTREAM EPG
  if (url.pathname === '/xtream_epg')  {
    let host = url.searchParams.get('host');
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    if (!host || !username || !password) return new Response("Missing parameters",  {
      status: 400
    }
    );
    if (!host.startsWith('http://') && !host.startsWith('https://'))  {
      host = 'http://' + host;
    }
    const targetUrl = `${host}/xmltv.php?username=${username}&password=${password}`;
    return Response.redirect(targetUrl, 302);
  }
  // 7. ROUTE: XTREAM API PROXY
  if (url.pathname.startsWith('/xtream_api'))  {
    let host = url.searchParams.get('host');
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    if (!host || !username || !password) return new Response("Missing parameters.",  {
      status: 400
    }
    );
    if (!host.startsWith('http://') && !host.startsWith('https://'))  {
      host = 'http://' + host;
    }
    url.searchParams.delete('host');
    let subPath = url.pathname.replace('/xtream_api', '');
    if (subPath === '' || subPath === '/') subPath = '/player_api.php';
    const targetUrl = `${host}${subPath}?${url.searchParams.toString()}`;
    const cleanHeaders = new Headers();
    cleanHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
    cleanHeaders.set('Accept', '*/*');
    try  {
      const response = await fetch(targetUrl,  {
        method: request.method,
        headers: cleanHeaders,
        body: (request.method !== 'GET' && request.method !== 'HEAD') ? request.body : null
      }
      );
      return new Response(response.body,  {
        status: response.status,
        headers:  {
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
      );
    } catch (e)  {
      return new Response(`Error proxying API: ${e.message}`,  {
        status: 500
      }
      );
    }
  }
  // 8. ROUTE: STALKER EPG
  if (url.pathname === '/epg.xml')  {
    const config = getStalkerConfig(request);
    if (!config.host || !config.mac_address) return new Response("Missing 'host' or 'mac'.",  {
      status: 400
    }
    );
    const  {
      token
    }
    = await genStalkerToken(config);
    if (!token) return new Response("Auth Failed.",  {
      status: 500
    }
    );
    const basePath = `http://${config.host}${config.path}`;
    const possiblePaths = [
    `${basePath}/server/xmltv.php?token=${token}`,
    `${basePath}/server/xmltv.php`,
    `${basePath}/xmltv.php`,
    `${basePath}/../xmltv.php`,
    `http://${config.host}/xmltv.php`
    ];
    let epgText = null;
    for (const path of possiblePaths)  {
      try  {
        const response = await fetch(path,  {
          headers: getHeaders(config, token)
        }
        );
        if (response.ok)  {
          const text = await response.text();
          if (text.trim().startsWith('<?xml'))  {
            epgText = text;
            break;
          }
        }
      } catch (e)  {
      }
    }
    if (epgText)  {
      return new Response(epgText,  {
        headers:  {
          'Content-Type': 'text/xml; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
        ,
      }
      );
    } else  {
      return new Response("Could not find EPG file on server.",  {
        status: 404
      }
      );
    }
  }
  // 9. ROUTE: STALKER PLAYLIST (SAFE & ERROR HANDLED)
  if (url.pathname === '/playlist.m3u8')  {
    try  {
      const config = getStalkerConfig(request);
      if (!config.host || !config.mac_address)  {
        return new Response("Missing 'host' or 'mac' parameter.",  {
          status: 400
        }
        );
      }
      const  {
        token
      }
      = await genStalkerToken(config);
      if (!token)  {
        return new Response("Stalker Auth Failed. Check Portal Host, Path, and MAC.",  {
          status: 401
        }
        );
      }
      const channelsUrl = `http://${config.host}${config.path}/server/load.php?type=itv&action=get_all_channels&JsHttpRequest=1-xml`;
      let channelsData = null;
      try  {
        const response = await fetch(channelsUrl,  {
          headers: getHeaders(config, token)
        }
        );
        const text = await response.text();
        if (!text || !text.trim())  {
          return new Response("Upstream Stalker portal returned empty data.",  {
            status: 502
          }
          );
        }
        channelsData = JSON.parse(text);
      } catch (parseErr)  {
        return new Response(`Error parsing channels JSON: ${parseErr.message}`,  {
          status: 502
        }
        );
      }
      let genreMap =  {
      }
      ;
      try  {
        const genresData = await getGenres(config, token);
        if (Array.isArray(genresData))  {
          genresData.forEach(g =>  {
            if (g && g.id) genreMap[g.id] = g.title || 'Other';
          }
          );
        }
      } catch (e)  {
      }
      const rawChannels = channelsData?.js?.data || channelsData?.data || (Array.isArray(channelsData) ? channelsData : []);
      if (!Array.isArray(rawChannels) || rawChannels.length === 0)  {
        return new Response("No channels found on this Stalker portal.",  {
          status: 404
        }
        );
      }
      let channels = rawChannels.map(item => ( {
        name: item?.name || 'Unknown Channel',
        cmd: item?.cmd || '',
        tvgid: item?.xmltv_id || '',
        id: item?.tv_genre_id || '',
        logo: item?.logo || '',
        title: genreMap[item?.tv_genre_id] || 'Other'
      }
      ));
      const m3uContent = await convertJsonToM3U(channels, config, url);
      return new Response(m3uContent,  {
        headers:  {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      );
    } catch (fatalErr)  {
      return new Response(`Stalker Worker Error: ${fatalErr.message}`,  {
        status: 500
      }
      );
    }
  }
  return new Response("Not Found",  {
    status: 404
  }
  );
}
