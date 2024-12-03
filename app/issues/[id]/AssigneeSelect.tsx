import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <>
        <Select.Root>
            <Select.Trigger placeholder='Suggestions'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="1">yahya bnoun</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </>
  )
}

export default AssigneeSelect