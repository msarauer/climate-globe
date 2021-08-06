import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Draggable from "react-draggable";
import {
  LineChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

interface Props {
  buttonLabel: string;
  dialogTitle: string;
  dialogText: string;
  data: any[];
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataDialog(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
        TransitionComponent={Transition}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.dialogTitle}
        </DialogTitle>
        <DialogContent>
          {/* Chart goes here? */}
          <LineChart
            width={1000}
            height={600}
            data={props.data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis dataKey="val" domain={['dataMin-1.5', 'dataMax']}/>
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="val" stroke="#ff7300" yAxisId={0} dot={false} />
          </LineChart>
          <DialogContentText>{props.dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
