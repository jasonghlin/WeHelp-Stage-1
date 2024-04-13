老師，這是我閱讀完 BigO 相關的資料後的回答，我對這些回答很沒把握，因為看完資料後還是對於程式碼步驟的計算很模糊，覺得很抽象，因此自己覺得好像在憑感覺回答@@

# Task 1: 

- green_line 的建立: 只是建立 list，時間複雜度是 O(1)

- 第一個迴圈 messages: 裡面每個步驟都遍歷 message 的數量次，因此時間複雜度是 O(n)

- currentStationIndex: 因為最差的情況下要遍歷整個 green_line 的次數，因此時間複雜度也是 O(n)

- 第二個迴圈 mrtStations: 裡面每個步驟都遍歷 mrtStations 的數量次，然後在每次的迴圈裡還要對每一站查詢 index，最差一樣是會遍歷整個 green_line，因此時間複雜度是 O(m * n)
- 綜合下來整體的時間複雜度就會落在第二個迴圈，也就是 O(n<sup>2</sup>)

# Task 2: 
- booking list 的建立: 這當中涉及到 map，要將每一個元素的值填入 duration + 1，總共次數是 duration 的數量，因此時間複雜度是 O(n)
- 過濾 availableConsultants: 使用了兩種迴圈方法，一個是對每個 consultant，另一個是對 booking list，最差的情況下就是每個 consultant 都要檢查整個 booking list，因此時間複雜度是 O(m*n) = O(n<sup>2</sup>)
- 選擇 best_consultant: 這裡是用一個 for 迴圈來執行，因此時間複雜度是 O(n)，其中 n 指的是 availableConsultants 的數量
- 更新顧問忙碌的時間: 這裡也是利用一個 for 迴圈來執行，因此時間複雜度也是 O(n)，其中 n 指的是 consultants 的數量
- 綜合下來整體的時間複雜度就會落在過濾 availableConsultants，也就是 O(n<sup>2</sup>)

# Task 3:
- 第一個 for 迴圈: 單純遍歷整個 data，因此時間複雜度是 O(n)
- 過濾出 unique middle name：
  - 在 JS 中利用兩個 filter 來找出 Unique 的 middle name，因此時間複雜度是 O(n<sup>2</sup>)
  - 在 python 則是只有一個 for 迴圈就解決，因此時間複雜度是 O(n)
- 返回有 unique middle name 的人名：
  - 在 JS 中利用一個 for 迴圈跟一個 filter 來執行，因此時間複雜度是 O(m*n) 其中 m 是 data 的數量，n 是 name 的數量
  - 在 python 則是只有使用一個 for 迴圈，因此時間複雜度是 O(n)
- 綜合下來整體的時間複雜度
  - 在 JS 就會是 O(n<sup>2</sup>)
  - 在 python 則是 O(n)

# Task 4:
- 因為總共會執行 n 次地回，因此時間複雜度為 O(n) (我非常不確定這個回答是不是真的是這樣想@@)
  
# Task 5:
- 過濾出 haveSeat: 只有用到一個 for 迴圈，因此時間複雜度是 O(n)
- if - else 判斷: 因為裡面有一個 for 迴圈來計算出最接近的位子數目，因此時間複雜度為 O(n)
- 綜合下來整體的時間複雜度就是 O(n)

Q/A
老師我想表達的東西應該比較像以下說的：
1. 第一個迴圈 messages: 裡面每個步驟都遍歷 message 的數量次，因此時間複雜度是 O(n):
   *  我覺得我在表達的時候將這裡和後面的混著說了，這裡的 n 我想表達的他的時間複雜度就是定義當中的 O(n) 這樣的複雜度，原因是他只會執行迴圈的次數，這裡的 n 沒有特別賦予意義
   *  我想我要表達的是如果特別說明，我想表達的 O(n) 就是時間複雜度定義的那些 O(n)、O(n<sup>2</sup>)...。如果有特別說綜合下來的話，代表最後那個才是時間複雜度定義的 O，在這之前提到的 O 是我在推導執行次數的表達方式
   *  因此後面提到的 m 和 n 則是想表達總共有兩個迴圈，因為兩個是 nested，因此裡面的回圈的執行次數會是兩個迴圈的總次數相乘，因此才會有 m 和 n 分別指兩個迴圈各自的執行次數。但因為時間複雜度我理解到的是他在看在都是執行次數接近無限的狀況，因此才會說最後綜合下來 O(m*n) 會合併成定義當中的 O(n<sup>2<sup>) 這樣的複雜度
2. 對，老師您說的沒錯，在我的程式碼當中他確實是一樣的東西，因為都是遍歷 data，我因為想表達他們是兩個不同的迴圈，因此用了不同的名稱來表達，但實際上他們的值會是一樣的


Q/A;
老師，我後來再閱讀了一下資料，不曉得這樣理解正不正確
1. O(n) 裡面的 n 指的是資料規模的大小，因此 Task 1 當中
   1. "第一個迴圈 messages" 的時間複雜度是 O(message 的數量)，因為他是變動的，假設他是 n，因此時間複雜度可以剪寫成 O(n)
   2. 第二個迴圈 mrtStations 裡面每個步驟都遍歷 mrtStations 的數量次，mrtStations 和我們 input 的資料量有關，假設這個數量是 j，又在每次的迴圈裡還要查詢每一站的 index，最差一樣是遍歷整個 green_line，因為 green_line 的數量是固定 19，因此時間複雜度是 O(19*j) 因為係數可以不計因此時間複雜度應該是 O(j)
2. Task 3 當中
   1. 在 JS 中利用一個 for 迴圈以及 filter 對 data 裡面的資料進行判斷是否是 unique middle name。因為 filter 在 for 迴圈中，因此至少要執行 data 數量次的 filter，這裡假設 data 有 n 個，又 filter 是再次將 data 中的每一筆資料去判斷是否包含 unique middle name，因此他的時間複雜度就是 O(n * n) = O(n^2)，其中這裡的 n 指的是 data 裡面的資料量