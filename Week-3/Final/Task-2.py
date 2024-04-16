
import urllib.request as request
import ssl
import bs4
import csv
ssl._create_default_https_context = ssl._create_unverified_context

URL  = "https://www.ptt.cc/bbs/Lottery/index.html"

def get_data(url):
    requestObj = request.Request(url, headers = {
        "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        'Cookie': 'over18=1'
    })

    with request.urlopen(requestObj) as response:
        data = response.read().decode('utf-8')

    root = bs4.BeautifulSoup(data, "html.parser")

    titles = root.find_all("div", class_ = "title")
    
    # 進入每一頁當中的每個 po 文
    for title in titles:
        article_dict = {}
        # print(title)
        # print("------------")
        if title.a != None:
            URL_NEXT = "https://www.ptt.cc" + title.a["href"]
            # print(URL_NEXT)
            requestObj_2 = request.Request(URL_NEXT, headers = {
                "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                'Cookie': 'over18=1'
            })
            with request.urlopen(requestObj_2) as response_2:
                full_data = response_2.read().decode("utf-8")
            
            root_2 = bs4.BeautifulSoup(full_data, "html.parser")
            # print(root_2)
            # print("------------")
            span_title = root_2.find("span",string = "標題")           
            if span_title != None:
                title = span_title.next_sibling.string
                article_dict["title"] = str(title)
                # print(str(title), end="")
            
            like = root_2.find_all("span",string = "推 ")
            # print(len(like), end = "")
            article_dict["like"] = str(len(like))
            
            dislike = root_2.find_all("span",string = "噓 ")
            # print(len(dislike), end = "")
            article_dict["dislike"] = str(len(dislike))

            span_time = root_2.find("span",string = "時間")
            if span_time != None:
                time = span_time.next_sibling.string
                # print(str(time))
                article_dict["time"] = str(time)
                article_list.append(article_dict)
        
        
    next_url = "https://www.ptt.cc" + root.find("a", string = "‹ 上頁")["href"]
    print(next_url)   
    return next_url
            
            

            
            
# get_data(URL)

article_list = []
count = 0
while count < 3:
    URL = get_data(URL)
    count += 1

header = ["title", "like", "dislike", "time"]
with open(f"article.csv", 'w') as file:    
    writer = csv.DictWriter(file, fieldnames=header)
    # writer.writeheader()
    for row in article_list:
        writer.writerow(row)



