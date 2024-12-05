


const isSafety = (arr) => {

  let safety = 0
  if (Array.isArray(arr[0])) {
    arr.filter(item => {
      safety += isSafety(item)
    })
  } else {

    let isSafe = true

    let arr1 = JSON.parse(JSON.stringify(arr))
    let arr2 = JSON.parse(JSON.stringify(arr))
    let arr3 = [...new Set(JSON.parse(JSON.stringify(arr)))]

    arr1.sort((a, b) => a - b)

    arr2.sort((a, b) => a - b)
    arr2.reverse()

    if ((arraysEqual(arr, arr1) || arraysEqual(arr, arr2)) && (arraysEqual(arr, arr3))) {

      arr.some((item, index) => {
        if (index + 1 < arr.length) {
          // 判断是否相差大于3
          if (Math.abs(item - arr[index + 1]) > 3) {
            isSafe = false
            return true
          }
        }
      })
    } else {
      isSafe = false
    }

    if (isSafe) {
      safety++
    }
  }
  return safety
}

// 判断两个数组是否相等
function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// 第二部分
const isSafety2 = (arr) => {

  let safety = 0

  if (Array.isArray(arr[0])) {
    arr.filter((item, index) => {
      safety += isSafety2(item)
    })
  } else {
    let isSafe = true
    isSafe = false

    arr.filter((item1, index1) => {
      let a = isSafety(arr.filter((item2, index2) => index2 != index1))
      if (a) {
        isSafe = true
      }
    })

    if (isSafe) {
      safety++
    }
  }
  return safety
}


// 读取文件
const readFileSync = (filePath)=> {
  console.log(filePath);

  try {
      const content = Deno.readTextFileSync(filePath);
      return content;
  } catch (error) {
      console.error("读取文件时出错:", error);
      throw error;
  }
}

const content = readFileSync(`./text.txt`);

console.log(isSafety(JSON.parse(content)));
console.log(isSafety2(JSON.parse(content)));