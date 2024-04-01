// 参考
// https://mui.com/material-ui/react-dialog/
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { formatDtAsMMDD, formatTimeForDispFromTo } from "../common/dateTool";

interface Props {
    bookingDate: Date;
    bookingTime: string;    // hh:mm形式
    facilityName: string;
    userName: string;
    phoneNumber: string;
    open: boolean;
    onClose: () => void;
    onSubmit: (userName: string, phoneNumber: string) => void;
    onCancelBooking: () => void;
}

const BookingEditDialog: React.FC<Props> = (props) => {
    // キャンセルボタン
    const handleOnClose = () => {
        props.onClose();
    }
    // 予約登録
    const handleOnSubmit = (un: string, pn: string) => {
        props.onSubmit(un, pn);
    }
    // 予約取り消し
    const handleOnCancelBooking = () => {
        props.onCancelBooking();
    }

    const defaultUserName = props.userName;
    const defaultPhoneNumber = props.phoneNumber;

    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleOnClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const userName = formJson.userName;
                    const phoneNumber = formJson.phoneNumber;
                    handleOnSubmit(userName as string, phoneNumber as string);
                  },
                }}
            >
                <DialogTitle>【変更/予約取消】 {formatDtAsMMDD(props.bookingDate)} {formatTimeForDispFromTo(props.bookingTime)} 設備:{props.facilityName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        変更する場合は、お名前とご連絡先をご入力し、変更ボタンを押してください。<br />
                        予約を取り消す場合は、予約取消ボタンを押してください。
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="userName"
                        name="userName"
                        label="お名前(必須)"
                        type="text"
                        fullWidth
                        variant="outlined"
                        defaultValue={defaultUserName}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="ご連絡先(必須)"
                        type="text"
                        fullWidth
                        variant="outlined"
                        defaultValue={defaultPhoneNumber}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose}>キャンセル</Button>
                    <Button type="submit">変更</Button>
                    <Button onClick={handleOnCancelBooking}>予約取消</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { BookingEditDialog };
