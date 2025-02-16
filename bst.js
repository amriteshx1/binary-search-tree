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
    
    //INSERT
    insert(value){
        this.root = this._insert(this.root,value);
    }
    _insert(node,value){
        if(node === null)return new Node(value);
        if(value < node.value){
            node.left = this._insert(node.left,value);
        }else if(value > node.value){
            node.right = this._insert(node.right, value);
        }
        return node;
    }

    //DELETE
    delete(value){
        this.root = this._delete(this.root,value);
    }
    _delete(node,value){
        if(node === null)return null;
        if(value < node.value){
            node.left = this._delete(node.left,value);
        }else if(value > node.value){
            node.right = this._delete(node.right, value);
        }else {
            //case 1
            if(node.left === null && node.right === null)return null;
            
            //case 2
            if(node.left === null)return node.right;
            if(node.right === null)return node.left;

            //case 3 (inorder successor)
            let successor = this._minNode(node.right);
            node.value = successor.value;
            node.right = this._delete(node.right, successor.value);
        }
        return node;
    }
    _minNode(node){
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }


}
const a = new Tree([2,3,5,1,4]);
console.log(a.root);