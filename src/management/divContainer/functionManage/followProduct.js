import React from "react";
import {URL} from "../../../url"

class FollowProduct extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Theo dõi');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu lấy ra all sản phẩm trên toàn quốc
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        var root = this;
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).products;
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var batch = document.createElement('td');
                        var status = document.createElement('td');
                        var description = document.createElement('td');

                        if (data[i]._id) id.innerHTML = data[i]._id;
                        else id.innerHTML = '';
                        
                        if (data[i].name) name.innerHTML = data[i].name;
                        else name.innerHTML = '';
                        
                        if (data[i].batch) batch.innerHTML = data[i].batch;
                        else batch.innerHTML = '';
                        
                        switch(data[i].status) {
                            case 'new_product': {
                                status.innerHTML = 'Mới sản xuất';
                                break;
                            }
                            case 'back_agent': {
                                status.innerHTML = 'Đưa về đại lý';
                                break;
                            }
                            case 'sold': {
                                status.innerHTML = 'Đã bán';
                                break;
                            }
                            case 'er_service': {
                                status.innerHTML = 'Lỗi cần bảo hành';
                                break;
                            }
                            case 'sv_fixing': {
                                status.innerHTML = 'Đang bảo hành';
                                break;
                            }
                            case 'sv_fixed': {
                                status.innerHTML = 'Đã bảo hành xong';
                                break;
                            }
                            case 'sv_return': {
                                status.innerHTML = 'Đã trả lại khách hàng';
                                break;
                            }
                            case 'er_back_factory': {
                                status.innerHTML = 'Lỗi cần trả về nhà máy';
                                break;
                            }
                            case 'er_back_production': {
                                status.innerHTML = 'Lỗi đã đưa về cơ sở sản xuất';
                                break;
                            }
                            case 'er_recall': {
                                status.innerHTML = 'Lỗi cần triệu hồi';
                                break;
                            }
                            case 'overtime_service': {
                                status.innerHTML = 'Hết thời gian bảo hành';
                                break;
                            }
                            default: {
                                status.innerHTML = 'Trả lại cơ sở sản xuất';
                            }
                        }
                        description.innerHTML = 'Xem';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(batch);
                        tr.appendChild(status);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/manager/all_product?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }
    
    // UI theo dõi toàn bộ sản phẩm trên toàn quốc của ban quản lý
    render() {
        return (
            <table className="tableProductLine">
                <caption>Sản phẩm trên toàn quốc</caption>
                <thead>
                    <tr>
                        <th className='columnId'>Id</th>
                        <th>Tên</th>
                        <th>Lô</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default FollowProduct