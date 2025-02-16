class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array){
        let sortedArr = [...new Set(array)].sort((a, b) => a - b);
        
        function sorted(arr,s,e){
            if(s > e)return null;
            let mid = Math.floor((s + e) / 2);
            let root = new Node(arr[mid]);
            root.left = sorted(arr,s,mid - 1);
            root.right = sorted(arr,mid + 1, e);
            return root;
        }
        return sorted(sortedArr,0,sortedArr.length - 1);
    }

}
const a = new Tree([2,3,5,1,4]);
console.log(a.root);
