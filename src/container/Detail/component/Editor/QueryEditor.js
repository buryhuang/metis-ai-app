import React,{ Fragment,useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsLight";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    innerContainer: {
        width: "97%",
        height: "80%"
    },
    table: {
        borderLeft: "1px solid #C2CEDB",
        overflow: "auto",
        maxHeight: document.body.scrollHeight / 3.15
    },
    cellStyle: {
        borderLeft: "1px solid #C2CEDB",
    },
    paginationCounterLabel: {
        margin: "0px 7px"
    },
    filterRoot: {
        width: 300,
        boxShadow: "0px 6px 4px rgba(222, 219, 219, 0.25)",
        background: "#fff"
    },
    inputStyle: {
        [`& fieldset`]: {
            borderRadius: 5,
        },
    },
    textAreaRoot: {
        background: "#fff"
    },
    textareaInput: {
        fontsize: 11,
    },
    textareaStyle: {
        '&:focus': {
            outline: "none",
            borderRadius: 0,
            border: 0
        },
        [`& fieldset`]: {
            borderRadius: 0,
            border: 0,
            outline: "none",

        },
    }

})
);



function QueryEditor(props) {
    useEffect(()=>{
        console.log('parent query here',props.parentQuery)
        setQuery(props.parentQuery)
    },[props.parentQuery])
    const highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language="sql">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Fragment>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                        </div>
                    ))}
                </Fragment>
            )}
        </Highlight>
    );

    const styles = {
        root: {
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            borderTop: "3px solid #EDF2F7",
            borderLeft: "1px solid #C2CEDB",
            borderBottom: "1px solid #C2CEDB",
            height: "30vh",
            padding: 0,
            overflow: "auto",
            ...theme.plain,
        }
    }
    const classes = useStyles();
    const [query,setQuery] = useState('select * from ');
    return (
        <div>
            <Editor
                value={query}
                onValueChange={code => setQuery(code)}
                highlight={highlight}
                style={styles.root}
                textareaClassName={classes.textareaStyle}
            />
        </div>
    )
}

export default QueryEditor
