
import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Divider } from "../../components/atoms";
import { Box, Paper, Typography } from "@mui/material";
import { CreateItems, CreateSection } from "../../components/organisms/CreateWorkbook";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function EditWorkbook() {
  const urlParams = useParams()
  const queryClient = useQueryClient()
  const workBookQuery = useQuery(["bookSection", urlParams.id], (params) => fetchWorkBook(params.queryKey[1]))

  const sectionUpdateMutation = useMutation(
    (params) => {
      return axios
        .put(process.env.REACT_APP_API_URL + "/workbook/update-sections/" + urlParams.id,
          params,
          {
            maxContentLength: 10000000,
            maxBodyLength: 10000000,
          }
        )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookSection")
      },
      onError: (err) => {
        alert(err)
      }
    }
  )

  if (workBookQuery.isLoading || workBookQuery.isError) return null

  const workBook = workBookQuery.data || {}

  const handleDragandDrop = (result) => {
    if (!result.destination) return
    const sections = reorder(
      workBook.sections,
      result.source.index,
      result.destination.index
    )

    workBook.sections = sections

    sectionUpdateMutation.mutate(workBook)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <div className="workbookForm" align="left" style={{ minHeight: '55vh' }}>
        <Typography color="primary.neutral" component="h1" variant="h1" sx={{ mb: 2 }}>
          Create New Workbook
        </Typography>
        <Divider />
        <label className="label">Content</label>
        {workBook.sections && workBook.sections.map((item, i) =>
          <CreateItems key={item._id} item={item} workBookId={urlParams.id} />
        )}
        {/* <Box>
          <DragDropContext onDragEnd={handleDragandDrop}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {workBook.sections.map((section, index) => (
                    <Draggable
                      key={`item-${section._id}`}
                      draggableId={`item-${section._id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CreateItems key={section._id} item={section} workBookId={urlParams.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box> */}
        <CreateSection workBookId={urlParams.id} workBook={workBook} />
      </div>
    </Paper >
  )
};

const fetchWorkBook = (params) => {
  return axios
    .get(process.env.REACT_APP_API_URL + `/workbook/${params}`)
    .then((response) => response.data)
}
