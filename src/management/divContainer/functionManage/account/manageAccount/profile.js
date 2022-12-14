import React, { Fragment } from "react"
import '../../../../../general/css/profile.css'
import {URL} from "../../../../../url"

class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.back = this.back.bind(this);
    }

    // Quay lại trang trước là trang quản lý (manageAccount)
    back() {
        this.props.changeTypeProfile('Quản lý');
    }

    // Thu hồi tài khoản thông qua username của tài khoản đó
    deleteAccount(event) {
        event.preventDefault();
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert('Thu hồi tài khoản thành công!');
                    // Thành công thì quay lại trang trước
                    root.back();
                }
            }
        }
        xmlHttp.open('POST', URL + '/manager/delete_account', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'username=' + this.props.userName
        )
    }

    // Load lần đầu lấy ra thông tin chi tiết của account cần xem thông qua username của account đó
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (data === null) return;
                    var arrInput = document.querySelectorAll('input');
                    var textarea = document.querySelector('textarea');

                    if (!data.name) arrInput[0].value = '';
                    else arrInput[0].value = data.name;
                    
                    arrInput[1].value = data.username;
                    arrInput[2].value = data.type;
                    if (data.verified) arrInput[3].value = 'Đã xác minh';
                    else arrInput[3].value = 'Chưa xác minh';

                    if (!data.address) arrInput[4].value = '';
                    else arrInput[4].value = data.address;

                    if (!data.phone) arrInput[5].value = '';
                    else arrInput[5].value = data.phone;

                    if (!data.bio) arrInput[2].value = '';
                    else textarea.value = data.bio;
                }
            }
        }
        xmlHttp.open('GET', URL + '/manager/get_profile_by_username?username=' + this.props.userName, false);
        xmlHttp.send(null);
    }

    // UI thông tin chi tiết của 1 account khác để tài khoản ban quản lý xem
    render() {
        return(
            <Fragment>
                <form className="profile" onSubmit={this.deleteAccount}>
                    <h1>Thông tin chi tiết</h1>

                    <label htmlFor='username'>Tên</label>
                    <input type='text' id='username' readOnly></input>
                    <br></br>
                    
                    <label htmlFor='username'>Tài khoản</label>
                    <input type='text' id='username' readOnly></input>
                    <br></br>
                    
                    <label htmlFor='type'>Loại tài khoản</label>
                    <input type='text' id='type' readOnly></input>
                    <br></br>

                    <label htmlFor='email'>Email đã/chưa xác minh</label>
                    <input type='text' id='email' readOnly></input>
                    <br></br>

                    <label htmlFor='address'>Địa chỉ</label>
                    <input type='text' id='address' readOnly></input>
                    <br></br>

                    <label htmlFor='phone'>Số điện thoại</label>
                    <input type='phone' id='phone' readOnly></input>
                    <br></br>

                    <label htmlFor='description'>Thông tin thêm</label>
                    <textarea id="description" readOnly></textarea>
                    <br></br>

                    <input type='submit' value='Thu hồi tài khoản'></input>
                </form>
                <i className='fas fa-arrow-circle-left' onClick={this.back}></i>
            </Fragment>
        )
    }
}

export default Profile