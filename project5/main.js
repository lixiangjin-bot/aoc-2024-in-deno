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

// 分开放置上下两部分内容
const getPart = (content) => {
  const arr = content.trim().split('\n')
  let part1 = []
  let part2 = []

  arr.filter(item => {
    let index1 = item.indexOf('|')
    let index2 = item.indexOf(',')
    if (index1 > -1) {
      part1.push(item.split('|'))
    } else if (index2 > -1) {
      part2.push(item.split(','))
    }
  })

  return { part1, part2 }

}


// 判断当前行是否违反规则
const isLegal = (arr1, arr2) => {
  let legal = true
  let num = 0

  arr2.some((item, index) => {
    if (index > 0) {
      arr1.some((item1, index1) => {
        if (item1[0] == item) {
          for (let i = 0; i < index; i++) {
            if (item1[1] == arr2[i]) {
              legal = false
            }
          }
        }
      })
    }
  })

  if (legal) {
    num = Number(arr2[(arr2.length - 1) / 2])
  }

  return { legal, num }
}

// 第一部分
const getAddResult = (content) => {
  let result = 0

  const { part1, part2 } = getPart(content)

  part2.filter((item, index) => {

    result += isLegal(part1, item).num

  })

  return result
}

const content = readFileSync(`./input.txt`);


console.log('第一部分:', getAddResult(content));


// 第二部分

// 获取正确排列
const getRightSort = (arr, errArr) => {

  let result = []
  let num = 0
  errArr.filter((item, index) => {
    if (index == 0) {
      result.push(item)
    } else {
      for (let i = 0; i < index + 1; i++) {
        let testArr = JSON.parse(JSON.stringify(result))

        testArr.splice(i, 0, item)
        let res = isLegal(arr, testArr)

        if (res.legal) {
          result = JSON.parse(JSON.stringify(testArr))
          num = res.num
          break;
        }
      }
    }

  })

  return {
    result, num
  }
}





const getAddResult2 = (content) => {
  let result = 0
  // 错误行
  let errArr = []
  const { part1, part2 } = getPart(content)

  part2.filter((item, index) => {

    const legal = isLegal(part1, item).legal
    if (!legal) {
      errArr.push(item)
    }

  })

  errArr.filter((item, index) => {
    result+=getRightSort(part1, item).num
  })

  return result
}

console.log('第二部分:', getAddResult2(content));
