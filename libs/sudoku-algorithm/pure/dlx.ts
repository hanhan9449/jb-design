const N = 1e6 + 10;
let ans = new Array(10), stk = new Array(100000);
for (let i = 0; i < ans.length; ++i) {
    ans[i] = new Array(10)
}



function DLX() {
    const  MAXSIZE = 1e5 + 10;
    let n, m, tot
        let first = new Array(MAXSIZE), siz = new Array(MAXSIZE);
    let L = new Array(MAXSIZE), R = new Array(MAXSIZE), U = new Array(MAXSIZE), D = new Array(MAXSIZE);
    let col = new Array(MAXSIZE), row = new Array(MAXSIZE);

    function build(r, c) {  // 进行build操作
        n = r; m = c;
        for (let i = 0; i <= c; ++i) {
            L[i] = i - 1; R[i] = i + 1;
            U[i] = D[i] = i;
        }
        L[0] = c; R[c] = 0; tot = c;
        first = new Array(MAXSIZE).fill(0)
        siz = new Array(MAXSIZE).fill(0)
    }

    function insert(r, c) {  // 进行insert操作
        col[++tot] = c; row[tot] = r; ++siz[c];
        D[tot] = D[c]; U[D[c]] = tot; U[tot] = c; D[c] = tot;
        if (!first[r])
            first[r] = L[tot] = R[tot] = tot;
        else {
            R[tot] = R[first[r]]; L[R[first[r]]] = tot;
            L[tot] = first[r]; R[first[r]] = tot;
        }
    }

    function remove(c) {  // 进行remove操作
        let i, j;
        L[R[c]] = L[c]; R[L[c]] = R[c];
        for (i = D[c]; i != c; i = D[i])
            for (j = R[i]; j != i; j = R[j])
                U[D[j]] = U[j]; D[U[j]] = D[j]; --siz[col[j]];
    }

    function recover(c) {  // 进行recover操作
        let i, j;
        for (i = U[c]; i != c; i = U[i])
            for (j = L[i]; j != i; j = L[j]) U[D[j]] = D[U[j]] = j; ++siz[col[j]];
        L[R[c]] = R[L[c]] = c;
    }

    function dance( dep) {  // dance
        let i, j, c = R[0];
        if (!R[0]) {
            for (i = 1; i < dep; ++i) {
                let x = (stk[i] - 1) / 9 / 9 + 1;
                let y = (stk[i] - 1) / 9 % 9 + 1;
                let v = (stk[i] - 1) % 9 + 1;
                ans[x][y] = v;
            }
            return 1;
        }
        for (i = R[0]; i != 0; i = R[i])
            if (siz[i] < siz[c]) c = i;
        remove(c);
        for (i = D[c]; i != c; i = D[i]) {
            stk[dep] = row[i];
            for (j = R[i]; j != i; j = R[j]) remove(col[j]);
            if (dance(dep + 1)) return 1;
            for (j = L[i]; j != i; j = L[j]) recover(col[j]);
        }
        recover(c);
        return 0;
    }
    return {
        insert,
        build,
        dance,
    }
}

function GetId( row,  col,  num) {
    return (row - 1) * 9 * 9 + (col - 1) * 9 + num;
}
const solver = DLX()

function Insert( row,  col,  num) {
    let dx = (row - 1) / 3 + 1;
    let dy = (col - 1) / 3 + 1;
    let room = (dx - 1) * 3 + dy;
    let id = GetId(row, col, num);
    let f1 = (row - 1) * 9 + num;            // task 1
    let f2 = 81 + (col - 1) * 9 + num;       // task 2
    let f3 = 81 * 2 + (room - 1) * 9 + num;  // task 3
    let f4 = 81 * 3 + (row - 1) * 9 + col;   // task 4
    solver.insert(id, f1);
    solver.insert(id, f2);
    solver.insert(id, f3);
    solver.insert(id, f4);
}

export function dlxmain(data: number[][]) {
    solver.build(729, 324);
    for (let i = 1; i <= 9; ++i)
    for (let j = 1; j <= 9; ++j) {
        ans[i][j] = data[i - 1][j - 1]
        for (let v = 1; v <= 9; ++v) {
            if (ans[i][j] && ans[i][j] != v) continue;
            Insert(i, j, v);
        }
    }
    solver.dance(1);
    return ans
}