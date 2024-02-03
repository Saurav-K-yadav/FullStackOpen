const dummy = (blogs) => { 
    return 1;
}

const total_likes = (blogs) => {
    const reduce=(total,curr)=>{
        return total+curr.likes
    }
return blogs.reduce(reduce,0)
}

module.exports = {
    dummy,total_likes
}