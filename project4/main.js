// 读取文件
const readFileSync = (filePath) => {
  console.log(filePath);

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
  // 上右下左
  const strs = [arr[i - 1]?.[j], arr[i]?.[j + 1], arr[i + 1]?.[j], arr[i]?.[j - 1]]

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

const getRightLetter = (arr, i, j,n,str)=>{



}


// 第一部分,找到XMAS


const getOccurrenceNumber = (content) => {

  const count = 0

  const arr = content.trim().split('\n')

  const positions = []

  // 找到每一个X在的位置
  arr.filter((item, index) => {
    findStrIndex(item, 'X').filter(item1 => {
      positions[index, item1]
    })
  })

  positions.filter(item, index => {
    let strs = getAround(arr, item[0], item[1])
    strs.filter((item1,index1)=>{
      if(item1=='M'){

      }
    })
  })

  return count

}

const content = readFileSync(`./input.txt`);


console.log(getOccurrenceNumber(content));
