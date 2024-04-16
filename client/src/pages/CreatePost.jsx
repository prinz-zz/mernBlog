import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  FileInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="p3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-semibold my-7">Create Post</h1>
      <form className="felx flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select id="countries" required className="flex-1">
            <option value="uncategorized">Select a cagtegory</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="node">Node</option>
          </Select>
        </div>

        <div className="flex my-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" type="imges/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline>
            Upload image
          </Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write..."
          className="h-72 mb-12"
        />
        
          <Button type="submit" gradientDuoTone="purpleToPink" className='w-full mt-6'>
            Publish
          </Button>
        
      </form>
    </div>
  );
}
