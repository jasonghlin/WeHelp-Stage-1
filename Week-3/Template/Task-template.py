# 不一定用得到
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import urllib.request as request
import json


# 寫入資料
with open('attraction.csv', mode='w', encoding='utf-8', newline='') as file:
    pass




#
with request.urlopen(網址) as response:
    data = response.read()
    data_json = json.load(data)
print(data)


# 逐行讀取：
for line in 檔案物件：
    
