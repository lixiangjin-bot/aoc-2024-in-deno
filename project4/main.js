// 读取文件
const readFileSync = (filePath) => {

  try {
    const content = Deno.readTextFileSync(filePath);
    return content;
  } catch (error) {
    console.error("读取文件时出错:", error);
    throw error;
  }
}

// 获取相邻值,没有为undefined
const getAround = (arr, i, j) => {

  // 八个点位
  // 上右下左,左上,右上,右下,左下

  const strs = [arr[i - 1]?.[j], arr[i]?.[j + 1], arr[i + 1]?.[j], arr[i]?.[j - 1],arr[i-1]?.[j-1],arr[i-1]?.[j+1],arr[i+1]?.[j+1],arr[i+1]?.[j-1]]

  return strs
}

// 获取所有符合的字符串
const findStrIndex = (mainStr, subStr) => {
  let positions = [];
  let position = mainStr.indexOf(subStr);

  // 当找到匹配项时，继续搜索直到找不到为止
  while (position !== -1) {
    positions.push(position);
    position = mainStr.indexOf(subStr, position + 1);
  }

  return positions;
}

// 判断n位的字母是否为str
const getRightLetter = (arr, i, j, n, str) => {

  let result

  const strs = getAround(arr, i, j)

  if (strs[n] == str) {
    result = true
  } else {
    result = false
  }


  return result

}


// 获取新字母的位置

const getPosition = ( i, j, n) => {

  if (n == 0) {
    return [i - 1, j]
  } else if (n == 1) {
    return [i, j + 1]
  } else if (n == 2) {
    return [i + 1, j]
  } else if (n == 3) {
    return [i, j - 1]
  } else if(n==4){
    return [i-1,j-1]
  }else if(n==5){
    return [i-1,j+1]
  }else if(n==6){
    return [i+1,j+1]
  }else if(n==7){
    return [i+1,j-1]
  }

}


// 第一部分,找到XMAS

const getOccurrenceNumber = (content) => {

  let count = 0

  const arr = content.trim().split('\n')

  let positionsX = []

  let positionsM = []

  let positionsA = []


  // 找到每一个X在的位置
  arr.filter((item, index) => {
    findStrIndex(item, 'X').filter(item1 => {
      positionsX.push([index, item1])
    })
  })

  // 遍历每一个X
  positionsX.filter((item, index) => {

    let strs = getAround(arr, item[0], item[1])

    strs.filter((item1, index1) => {
      let res = getRightLetter(arr, item[0], item[1], index1, 'M')
      if (res) {
        let position = getPosition(item[0], item[1], index1)
        if(arr[position[0]]?.[position[1]]){
          positionsM.push([...position,index1])
        }
      }
    })
  })

  // 遍历每一个M
  positionsM.filter((item,index)=>{
    let res = getRightLetter(arr, item[0], item[1], item[2], 'A')
    if (res) {
      let position = getPosition(item[0], item[1], item[2])
      if(arr[position[0]]?.[position[1]]){
        positionsA.push([...position,item[2]])
      }
    }
  })

  // 遍历每一个A
  positionsA.filter((item,index)=>{
    let res = getRightLetter(arr, item[0], item[1], item[2], 'S')
    if (res) {
      count ++
    }
  })

  return count

}

const content = readFileSync(`./input.txt`);


console.log('第一部分:',getOccurrenceNumber(content));



// 第二部分,找到X-MAS

const getOccurrenceNumber2 = (content) => {
  let count = 0

  const arr = content.trim().split('\n')


  let positionsM = []

  let positionsA = []

   // 找到每一个A在的位置
   arr.filter((item, index) => {
    findStrIndex(item, 'A').filter(item1 => {
      positionsA.push([index, item1])
    })
  })

  // 遍历每个A,查寻4,5,6,7位
  positionsA.filter((item,index)=>{
    let positions = getAround(arr, item[0], item[1])
    const part1 = positions[4]=='M'&&positions[5]=='M'&&positions[6]=='S'&&positions[7]=='S'
    const part2 = positions[4]=='S'&&positions[5]=='M'&&positions[6]=='M'&&positions[7]=='S'
    const part3 = positions[4]=='M'&&positions[5]=='S'&&positions[6]=='S'&&positions[7]=='M'
    const part4 = positions[4]=='S'&&positions[5]=='S'&&positions[6]=='M'&&positions[7]=='M'
    if(part1||part2||part3||part4){
      count ++
    }
  })

  return count

}


console.log('第二部分:',getOccurrenceNumber2(content));