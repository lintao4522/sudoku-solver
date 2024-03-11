const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
let output;
chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('1用有效的解谜字符串解决一个谜题：POST 请求到 /api/solve',(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:'.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'})
        .end((req,res)=>{
            assert.equal(res.status,200);
            output='473891265851726394926345817568913472342687951197254638734162589685479123219538746'
            assert.equal(res.body.solution,output);

        })
        done();
    })
    test('2用缺失的解谜字符串解决一个谜题：POST 请求到 /api/solve',(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:''})
        .end((req,res)=>{
            assert.equal(res.status,200);
            output='Required field missing';
            assert.equal(res.body.error,output);

        });done();
    })
    test('3用无效字符解决一个谜题：POST 请求到 /api/solve',(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:'.o.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'})
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output='Invalid characters in puzzle';
            assert.equal(res.body.error,output);

        });done();
    })
    test('4用不正确的长度解决一个谜题：POST 请求到 /api/solve',(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:'..89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'})
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output='Expected puzzle to be 81 characters long';
            assert.equal(res.body.error,output);

        });done();
    })
    test('5解决一个无法解决的谜题：POST 请求到 /api/solve',(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:'.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.7'})
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output='Puzzle cannot be solved';
            assert.equal(res.body.error,output);

        });done();
    })
    test('6检查所有字段的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'A1',
            value:1
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output=false;
            assert.equal(res.body.valid,output);

        });done();
    })
    test('7用单个位置冲突检查解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'A2',
            value:1
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            
            assert.equal(res.body.conflict.length,1);

        });done();
    })
    test('8检查一个有多个位置冲突的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'A4',
            value:1
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= [ "row" ] ;
            assert.equal(res.body.conflict.length,1);

        });done();
    })
    test('9检查与所有位置冲突的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'A1',
            value:5
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output=[ "column", "region", "row" ]  ;
            assert.equal(res.body.conflict.length,3);

        });done();
    })
    test('10检查缺失所需字段的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'',
            value:5
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= "Required field(s) missing"  ;
            assert.equal(res.body.error,output);

        });done();
    })
    test('11检查一个有无效字符的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.a',
            coordinate:'o1',
            value:5
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= "Invalid characters in puzzle" ;
            assert.equal(res.body.error,output);

        });done();
    })
    test('12检查不正确长度的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.',
            coordinate:'o1',
            value:5
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= "Expected puzzle to be 81 characters long"  ;
            assert.equal(res.body.error,output);

        });done();
    })
    test('13检查一个有无效字符的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'o1',
            value:5
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= "Invalid coordinate"  ;
            assert.equal(res.body.error,output);

        });done();
    })
    test('14检查具有无效的放置值的解谜位置：POST 请求到 /api/check',(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({
            puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate:'A1',
            value:11
    })
        
        .end((req,res)=>{
            assert.equal(res.status,200);
            output= "Invalid value" ;
            assert.equal(res.body.error,output);

        });done();
    })

});

