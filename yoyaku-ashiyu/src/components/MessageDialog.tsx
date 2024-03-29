// 参考
// https://mui.com/material-ui/react-dialog/
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    messages: string[];
    open: boolean;
    onClose: () => void;
}

const MessageDialog: React.FC<Props> = (props) => {
    const handleOnClose = () => {
        props.onClose();
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleOnClose}
            >
                <DialogTitle>予約を完了しました</DialogTitle>
                <DialogContent>
                    {props.messages.map(m => (
                        <DialogContentText>{m}</DialogContentText>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { MessageDialog };
