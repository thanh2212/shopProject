import React from "react"
import Storage from './functionService/storage/storage'
import Fixed from './functionService/storage/fixed'
import Failed from './functionService/storage/failed'
import MessageFromAgent from './functionService/messageFromAgent'
import InforAccount from '../../general/informationAccount/inforAccount'
import Details from "../../general/historyDetails/details"
import PreliminaryInfor from "../../general/informationAccount/preliminaryInfor"
import CustomerInfor from "../../general/informationAccount/customerInfor"
import Statistical from "./functionService/statistical"
import ChangeEmail from "../../general/informationAccount/changeInforAccount/changeEmail"
import ChangePassword from "../../general/informationAccount/changeInforAccount/changePassword"

class DivContainer extends React.Component {

    /*
      UI của service:
        - typeFunction: xác định component sẽ hiển thị
        - changeType: thay đổi typeFunction
        - id: id của account
    */
    render() {
        return(
            <div className="container">
                <header></header>
                <main>
                    <FunctionService typeFunction={this.props.typeFunc} changeType={this.props.changeTypeFunc} id={this.props.id}/>
                </main>
            </div>
        )
    }
}

/*
    Lựa chọn component sẽ hiện thị thông qua tham số mà component khác truyền vào cho nó        
*/
class FunctionService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: 'none', // lưu trữ id sản phẩm được hiển thị
            userName: 'none', // lưu trữ username tài khoản khác để xem
            backType: 'none' // lưu trữ trang quay lại
        }
        this.changeProductId = this.changeProductId.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changeBackType = this.changeBackType.bind(this);
    }

    changeBackType(type) {
        this.setState({
            backType: type
        })
    }

    changeProductId(id) {
        this.setState({
            productId: id
        })
    }

    changeUserName(name) {
        this.setState({
            userName: name
        })
    }

    render() {
        var type = this.props.typeFunction; // Kiểu hiển thị

        // Hiển thị component tương ứng với type mà DivContainer truyền vào
        switch(type) {
            case "Trong kho": return <Storage changeTypeProfile={this.props.changeType} id={this.props.id}
                changeProductId={this.changeProductId} changeBackType={this.changeBackType}/>
            case "Sửa chữa xong": return <Fixed changeTypeProfile={this.props.changeType} id={this.props.id}
                changeProductId={this.changeProductId} changeBackType={this.changeBackType}/>
            case "Không thể sửa": return <Failed changeTypeProfile={this.props.changeType} id={this.props.id}
                changeProductId={this.changeProductId} changeBackType={this.changeBackType}/>
            case "Thông báo bảo hành": return <MessageFromAgent changeTypeProfile={this.props.changeType}
                id={this.props.id} changeProductId={this.changeProductId} changeBackType={this.changeBackType}/>
            case "Xem": return <Details changeTypeProfile={this.props.changeType} productId={this.state.productId}
                changeUserName={this.changeUserName} backType={this.state.backType}/>
            case "Vị trí kho": return <PreliminaryInfor userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Khách hàng": return <CustomerInfor productId={this.state.productId} changeTypeProfile={this.props.changeType}/>
            case "Thống kê": return <Statistical id={this.props.id}/>
            case "Thay đổi email": return <ChangeEmail id={this.props.id}/>
            case "Thay đổi mật khẩu": return <ChangePassword id={this.props.id}/>
            default: return <InforAccount id={this.props.id}/>
        }
    }
}


export default DivContainer