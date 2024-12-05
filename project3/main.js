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


// 第一部分
const getResult = (content) => {
  // 正则表达
  const regex = /mul\((\d{1,3}),\s*(\d{1,3})\)/g

  let results = 0
  let match

  // 捕获数字
  while ((match = regex.exec(content)) !== null) {
    results += Number(match[1]) * Number(match[2])
  }

  return results
}

const content = readFileSync(`./input.txt`);

console.log('第一部分答案:',getResult(content));




// 第二部分

// 查寻字符串位置数组
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


const getResult2 = (content) => {
  let result = getResult(content)

  // 获取don't()的位置
  const notDo = findStrIndex(content, "don't()")
  // 获取do()的位置
  const yesDo = findStrIndex(content, "do()")

  yesDo.filter((item,index) => {

    if(index==0){
      result -= getResult(content.slice(notDo[0],yesDo[0]+4))

    }else{
      notDo.some((item2) => {
        if (item > item2 && item2 > yesDo[index-1]) {
          result -= getResult(content.slice(item2, item+4))

          return true
        }

        return false

      })
    }

  })

  // 判断最后是否停止don't
  if(yesDo[yesDo.length-1]<notDo[notDo.length-1]){
    notDo.some(item=>{
      if(item>yesDo[yesDo.length-1]){
        result-=getResult(content.slice(item))
        return true
      }
      return false
    })
  }

  return result
}

console.log('第二部分答案:', getResult2(content));