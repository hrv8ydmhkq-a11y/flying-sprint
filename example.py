# Created on iPhone.

print("Hello World!")
import webbrowser
import os

# 指向你生成的 GalaxyDash 文件夹下的 index.html
html_file = os.path.abspath('./GalaxyDash/index.html')

if not os.path.exists(html_file):
    print("❌ index.html 不存在，请确认 GalaxyDash 文件夹路径正确")
else:
    webbrowser.open('file://' + html_file)
    print("✅ 游戏已打开，请在 Pythonista 浏览器中试玩！")