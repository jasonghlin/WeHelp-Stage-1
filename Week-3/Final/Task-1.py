import urllib.request as request
import json
import csv
URL_1  = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
URL_2 = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2"

def write_csv(data, output_csv_name):
    header = ["stitle", "address", "longitude", "latitude", "filelist"]
    with open(f"{output_csv_name}.csv", 'w') as file:    
        writer = csv.DictWriter(file, fieldnames=header)
        # writer.writeheader()
        for row in data:
            writer.writerow(row)

def write_mrt_spot_csv(data, output_csv_name):
    with open(f"{output_csv_name}.csv", 'w') as file:    
        writer = csv.writer(file)
        for key, values in data.items():
            row = []
            row.append(key)
            row.extend(values)
            writer.writerow(row)

with request.urlopen(URL_1) as response:
    data_1 = json.loads(response.read().decode('utf-8'))
    if data_1:
        data_1 = data_1["data"]["results"]


with request.urlopen(URL_2) as response:
    data_2 = json.loads(response.read().decode('utf-8'))
    if data_2:
        data_2 = data_2["data"]

output_data = []
full_data = []
for i in range(len(data_1)):
    for j in range(len(data_2)):
        if data_1[i]["SERIAL_NO"] == data_2[j]["SERIAL_NO"]:
            full_data.append({**data_1[i], **data_2[j]})

# full_data = [{**data_1[i], **data_2[i]} for i in range(len(data_1)) if data_1[i]["SERIAL_NO"] == data_2[i]["SERIAL_NO"]]

for i in range(len(full_data) - 1):
    filtered_data = {key: value for key, value in full_data[i].items() if key in ["stitle", "address", "longitude", "latitude", "filelist"]}
    output_data.append(filtered_data)
    output_data[i]["filelist"] = "https://" + output_data[i]["filelist"].split("https://")[1]
    output_data[i]["address"] = output_data[i]["address"].split()[1][:3]

# group data by mrt
mrt_groups = {}
for i in range(len(full_data)):
    mrt = full_data[i]["MRT"]
    if mrt:
        if mrt not in mrt_groups:
            mrt_groups[mrt] = []
        mrt_groups[mrt].append(full_data[i]["stitle"])

    


write_csv(output_data, "spot")
write_mrt_spot_csv(mrt_groups, "mrt")
print(mrt_groups)

