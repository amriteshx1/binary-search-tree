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

    //FIND
    find(value) {
        return this._findRec(this.root, value);
    }
    _findRec(node, value) {
        if (node === null || node.value === value) return node;
        return value < node.value 
            ? this._findRec(node.left, value) 
            : this._findRec(node.right, value);
    }

    //LEVEL-ORDER TRAVERSAL
    levelOrder(callback){

        //this one is iterative way, will add the recursive approach later
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }

        let queue = [this.root];
        while (queue.length > 0){
            let node = queue.shift(); 
            callback(node); 
    
            if (node.left) queue.push(node.left); 
            if (node.right) queue.push(node.right);
        }
    }

    //INORDER
    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        this._inOrderRecur(this.root, callback);
    }
    _inOrderRecur(node,callback){
        if (node === null) return;
        this._inOrderRecur(node.left, callback);
        callback(node);
        this._inOrderRecur(node.right, callback);
    }

    //PRE-ORDER
    preOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        this._preOrderRecur(this.root, callback);
    }
    _preOrderRecur(node,callback){
        if (node === null) return;
        callback(node);
        this._preOrderRecur(node.left, callback);
        this._preOrderRecur(node.right, callback);
    }

    //POST-ORDER
    postOrder(callback){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
        this._postOrderRecur(this.root, callback);
    }
    _postOrderRecur(node,callback){
        if (node === null) return;
        this._postOrderRecur(node.left, callback);
        this._postOrderRecur(node.right, callback);
        callback(node);
    }



}
const a = new Tree([2,3,5,1,4]);