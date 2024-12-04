const arr1 = [5,99,8,5,4,7,38,5,52]



const arr2 = [9,82,5,4,47,5,42,6,9]



// 获取总距离
const getTotalDistance = (arr1, arr2) => {

  arr1.sort((a,b)=>a-b)
  arr2.sort((a,b)=>a-b)

  let totalDistance = 0

  arr1.filter((item,index)=>{
    totalDistance+=Math.abs(item-arr2[index])
  })

  return totalDistance
}

console.log(getTotalDistance(arr1, arr2));


// 获取相似度
const getSimilarityScore = (arr1, arr2) => {

  let totalSimilarityScore = 0

  arr1.filter(item=>{
    arr2.filter(item2=>{
      if(item===item2){
        totalSimilarityScore += item
      }
    })
  })

  return totalSimilarityScore
}

console.log(getSimilarityScore(arr1, arr2));