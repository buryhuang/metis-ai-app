import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TableIcon from '../../../../assets/sidebar/carbon_table-split.png';
import DatabaseIcon from '../../../../assets/sidebar/database.png';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderRadius: 4,
        paddingRight: 4,
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;


    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box sx={{ mr: 1 }}>
                        <img src={LabelIcon} height="15" />
                    </Box>
                    <Typography sx={{ fontSize: 12 }} sx={{ textTransform: "capitalize", fontWeight: 400, flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

export default function Sidebar({ data, pid, onClick }) {

    const renderTree = (nodes) => {
        return (
            <StyledTreeItem
                key={nodes.id}
                nodeId={nodes.id}
                labelText={nodes.name}
                onClick={() => nodes.id !== pid && onClick(nodes.id,nodes.name)}
                labelIcon={nodes.id === pid ? DatabaseIcon : TableIcon}
            >
                {Array.isArray(nodes.dataframes)
                    ? nodes.dataframes.map((node) => renderTree(node))
                    : null}
            </StyledTreeItem>
        );
    };

    return (
        <Fragment>
            {data ?
                <TreeView
                    aria-label="sidebar"
                    defaultExpanded={['3']}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                    sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    {renderTree(data)}
                </TreeView>
                :
                <Box />
            }
        </Fragment>
    );
}
