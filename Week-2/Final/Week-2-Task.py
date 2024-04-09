# 支線另外處理
# 有順序的處理

print("-------------- Task-1 --------------")
def find_and_print(messages, current_station):
    # your code here
    green_line = ["Songshan", "Nanjing Sanmin", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan", "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building", "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian"]
    # print(len(green_line))
    
    #過濾出 message 當中的 mrt
    mrt_stations = []
    for message in messages.values():
        if "station" in message:
            if "near" in message:
                start_index = message.find("near") + len("near")
            else:
                start_index = message.find("at") + len("at")
            end_index = message.find("station")
            station_name = message[start_index:end_index].strip()
            mrt_stations.append(station_name)
        else:
            start_index = message.find("at") + len("at")
            end_index = message.find(".")
            station_name = message[start_index:end_index].strip()
            mrt_stations.append(station_name)
            
    mrt_names = [name.replace(" station", "").replace(" MRT", "") for name in mrt_stations]

    # print(mrt_names)


    current_station_index = 16 if current_station == "Xindian" else green_line.index(current_station)
    min_length = 99
    min_index = 0
    # 找到 mrt_name 的 i 是最短路徑
    for i in range(len(mrt_names)):
        if mrt_names[i] == "Xiaobitan":
            # print("Xiaobitan")
            # Qizhang index 16
            length = abs(16 - current_station_index) + 1
            if length < min_length:
                min_length = length
                min_index = i
        else:
            length = abs(green_line.index(mrt_names[i]) - current_station_index)
            if length < min_length:
                min_length = length
                min_index = i
    # print(mrt_names[min_index])
   
    # for i in range(len(mrt_names)):
    #     if mrt_names[min_index] in list(messages.values())[i]
    friend = [list(messages.keys())[i] for i in range(len(mrt_names)) if mrt_names[min_index] in list(messages.values())[i]]
    print("".join(friend))
    

messages={
    "Leslie":"I'm at home near Xiaobitan station.",
    "Bob":"I'm at Ximen MRT station.",
    "Mary":"I have a drink near Jingmei MRT station.",
    "Copper":"I just saw a concert at Taipei Arena.",
    "Vivian":"I'm at Xindian station waiting for you."
}

find_and_print(messages, "Wanlong") # print Mary 
find_and_print(messages, "Songshan") # print Copper 
find_and_print(messages, "Qizhang") # print Leslie
find_and_print(messages, "Ximen") # print Bob
find_and_print(messages, "Xindian City Hall") # print Vivian

print("-------------- Task-2 --------------")
# 先處理時間的部分
# your code here, maybe

def book(consultants, hour, duration, criteria):
    # your code here
    # booking: 客戶預約時間
    booking = list(range(hour, hour + duration+1))
    # print(booking)

    #從後面開始往前刪除，remove 和 booking 重疊的 consultant 
    available_consultants = consultants[:]
    for i in range(len(available_consultants) - 1, -1, -1):
        if any(time in available_consultants[i]["busy_time"] for time in booking):
            available_consultants.pop(i)
    # print(available_consultants)

    if available_consultants == []:
        print("No Service")
        return

    best_consultant = {"rate": 0, "price": 9999}
    if criteria == "price":
        for consultant in available_consultants:
            if consultant["price"] < best_consultant["price"]:
                best_consultant = consultant
                
    elif criteria == "rate":
        for consultant in available_consultants:
            if consultant["rate"] > best_consultant["rate"]:
                best_consultant = consultant

    for consultant in consultants:
        if consultant["name"] == best_consultant["name"]:
            consultant["busy_time"].extend(booking)
            break

    print(best_consultant["name"])
consultants=[
    {"name":"John", "rate":4.5, "price":1000},
    {"name":"Bob", "rate":3, "price":1200},
    {"name":"Jenny", "rate":3.8, "price":800}
]


for consultant in consultants:
    consultant["busy_time"] = []

book(consultants, 15, 1, "price") # Jenny
book(consultants, 11, 2, "price") # Jenny
book(consultants, 10, 2, "price") # John
book(consultants, 20, 2, "rate") # John
book(consultants, 11, 1, "rate") # Bob
book(consultants, 11, 2, "rate") # No Service
book(consultants, 14, 3, "price") # John

print("-------------- Task-3 --------------")
def func(*data):
    # your code here
    data_list = list(data)
    
    middle_name = []
    for name in data_list:
        if len(name) == 5:
            middle_name.extend(name[2])
        elif len(name) == 2:
            middle_name.extend(name[-1])
        else:
            middle_name.extend(name[-2])

    # print(middle_name)
    unique_name = [name for name in middle_name if middle_name.count(name) == 1]
    # print(unique_name)
    
    if unique_name == []:
        print("沒有")
        return
    final = "".join([name for name in data_list if "".join(unique_name) in name])
    print(final)

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

print("-------------- Task-4 --------------")
# 0, 4, 8, 7, 11, 15, 14, 18, 22, 21, 25, ...
# n n+4 n+8 n+8-1 n+8-1+4
def get_number(index):
    # your code here
    if index == 0:       
        return 0
    elif index % 3 == 0:        
        return get_number(index-1) - 1
    else:       
        return get_number(index -1) + 4

print(get_number(1)) # print 4
print(get_number(5)) # print 15
print(get_number(10)) # print 25
print(get_number(30)) # print 70

print("-------------- Task-5 --------------")
def find(spaces, stat, n):
    # your code here
    have_seat = [spaces[i] for i in range(len(spaces)) if spaces[i] >= n and stat[i] == 1]
    if len(have_seat) == 0:
        print(-1)
        return
    else:
        min_len = 99
        min_num = -1
        for i in range(len(have_seat)):
            if have_seat[i] - n < min_len:
                min_len = have_seat[i] - n
                min_num = have_seat[i]

        print(spaces.index(min_num))


find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2) # print 5
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4) # print -1
find([4, 6, 5, 8], [0, 1, 1, 1], 4) # print 2