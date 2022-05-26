const axios=require("axios");
const fs=require("fs");
const read=require("readline-sync");
get_url =axios.get("https://api.merakilearn.org/courses");
const mainData=new Promise((resolve,reject)=>{
    resolve(get_url);
});
// console.log(get_url)
mainData.then((resolve1)=>{
    mdata=resolve1.data
    // console.log(mdata)
    fs.writeFileSync("packData.json",JSON.stringify(mdata,null,3));
    sNo=1
    for(i in mdata){
        console.log(sNo,'.',mdata[i]['name'],':',mdata[i]['id']);
    sNo+=1};
    courseNum=read.questionInt("enter any course number which you want: ")
    console.log(mdata[courseNum-1]['name'],mdata[courseNum-1]['id']);
    mdata2=mdata[courseNum-1]['id'];
    url=axios.get("http://api.merakilearn.org/courses/"+String(mdata2)+"/exercises");
    const mainData2=new Promise((resolve,reject)=>{
        resolve(url);
    })
    // console.log(url)
    mainData2.then((resolve2)=>{
        mdata2=resolve2.data
        fs.writeFileSync("merakiData.json",JSON.stringify(mdata2,null,4))
        var sNo2=1;
        var arr1=[];
        var arr2=[];
        for(var j in mdata2['course']['exercises']){
            if(mdata2['course']['exercises'][j]['parent_exercise_id']==null){
                console.log(sNo2,mdata2['course']['exercises'][j]['name']);
                console.log(" ",sNo2,mdata2['course']['exercises'][j]['slug']);
                sNo2+=1;
                arr1.push(mdata2['course']['exercises'][j]);
                arr2.push(mdata2['course']['exercises'][j]);
                continue }
            if (mdata2['course']['exercises'][j]['parent_exercise_id']==mdata2['course']['exercises'][j]['id']){
                console.log(sNo2,mdata2['course']['exercises'][j]['name']);
                arr1.push(mdata2['course']['exercises'][j]);
                sNo2+=1;
                }count=1;
            for(l in mdata2['course']['exercises']){
                if (mdata2['course']['exercises'][j]['parent_exercise_id']!=mdata2["course"]["exercises"][j]["id"]);
                    console.log(" ",count,mdata2['course']['exercises'][j]);
                    arr2.push(mdata2['course']['exercises'][j])
                    count+=1;
                    break}}
        var topicNum=read.questionInt("enter a number to choose a topic:");
        for(let a=0;a<arr1.length;a++){
            if(topicNum==a+1){
                console.log(topicNum,arr1[a]['name']);
                console.log(arr1[a]['content']);
                var m=arr1[a]['parent_exercise_id']}}
        sNo3=1;
        topic=[];
        topicContent=[];
        for(var f=0;f<arr2.length;f++){
            if(arr2[f]['parent_exercise_id']==m){
                console.log(" ",sNo3,arr2[f]['name']);
                topic.push(arr2[f]['name']);
                topicContent.push(arr2[f]['content']);
                sNo3+=1
            }
        }
        subPoint=read.questionInt("enter a number to choose a point:");
        d=1
        for(let h=0;h<topic.length;h++){
            if(subPoint==d){
                console.log(topic[h]);
                console.log(topicContent[h]);
            }
        }
    }).catch((reject)=>{
            console.log(reject);
        })
}).catch((reject)=>{
    console.log(reject);
})