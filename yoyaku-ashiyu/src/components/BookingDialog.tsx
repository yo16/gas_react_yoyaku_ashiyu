// 参考
// https://mui.com/material-ui/react-dialog/
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { formatDtAsMMDD, formatTimeForDispFromTo } from "../common/dateTool";
import {COOKIE_USERNAME, COOKIE_PHONENUMBER } from "../App";

interface Props {
    bookingDate: Date;
    bookingTime: string;    // hh:mm形式
    facilityName: string;
    open: boolean;
    onClose: () => void;
    onSubmit: (userName: string, phoneNumber: string) => void;
}

const BookingDialog: React.FC<Props> = (props) => {
    const [cookies] = useCookies([COOKIE_USERNAME, COOKIE_PHONENUMBER]);

    const handleOnClose = () => {
        props.onClose();
    }
    const handleOnSubmit = (un: string, pn: string) => {
        props.onSubmit(un, pn);
    }

    const defaultUserName = cookies[COOKIE_USERNAME]
        ? cookies[COOKIE_USERNAME]
        : "";
    const defaultPhoneNumber = cookies[COOKIE_PHONENUMBER]
        ? cookies[COOKIE_PHONENUMBER]
        : "";

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
                <DialogTitle>{formatDtAsMMDD(props.bookingDate)} {formatTimeForDispFromTo(props.bookingTime)} 設備:{props.facilityName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        お名前とご連絡先をご入力ください。
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
                    <Button type="submit">予約</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { BookingDialog };
