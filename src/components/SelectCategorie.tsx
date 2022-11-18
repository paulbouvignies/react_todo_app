import React from 'react'
// @ts-ignore
import Select from 'react-select'

const options = [
    { value: 'uncategorized', label: 'Uncategorized' },
    { value: 'product', label: 'Product' },
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' }
]

const SelectCategories: React.FC = () => (
    <Select
        options={options}
        defaultValue={options[0]}
    />
)

export default SelectCategories