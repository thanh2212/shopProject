import React from "react";
import {URL} from "../../../../url"

class NewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.receiveProduct = this.receiveProduct.bind(this);
        this.show = this.show.bind(this);
    }

    //Xử lý event đại lý click xác nhận là đã nhận đc sản phẩm mới từ cơ sở sản xuất
    receiveProduct(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    
                }
            }
        }
        xmlHttp.open('POST', URL + '/agent/recive_new_product', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_product=' + productId
        )
        alert("Nhận thành công!\nSản phẩm đã được chuyển vào trong kho");
        var tbody = document.querySelector('tbody');
        tbody.removeChild(event.parentNode);
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Sản phẩm mới về');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    const prName = JSON.parse(this.responseText).listProducerName;
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr');
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var from = document.createElement('td');
                        var description = document.createElement('td');
                        var receive = document.createElement('td');

                        id.innerHTML = data[i]._id;
                        name.innerHTML = data[i].name;
                        from.innerHTML = prName[i].pr_name;
                        description.innerHTML = 'Xem';
                        receive.innerHTML = 'Nhận';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(from);
                        tr.appendChild(description);
                        tr.appendChild(receive);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }

                        receive.style.cursor = 'pointer';
                        receive.onclick = function() {
                            root.receiveProduct(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/agent/list_new_product_nc?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI của agent gồm all sản phẩm được các CSSX gửi đến agent mà agent chưa nhận
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Sản phẩm mới về</caption>
                <thead>
                    <tr>
                        <th className="columnId">Id</th>
                        <th>Tên</th>
                        <th>Từ</th>
                        <th>Chi tiết</th>
                        <th>Nhận</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default NewProduct