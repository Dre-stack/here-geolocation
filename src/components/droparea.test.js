import DropArea from './droparea/DropArea';
import {
  render,
  screen,
  fireEvent,
  createEvent,
  cleanup,
} from '@testing-library/react';

afterEach(cleanup);

describe('<DropArea/>', () => {
  it('renders without crashing', () => {
    render(<DropArea />);
  });
  it('shows drop file here on first render', () => {
    render(<DropArea />);
    expect(screen.getByTestId('droparea')).toHaveTextContent(
      'DROP FILE HERE'
    );
  });
  it('show addresses button is disabled when loading', () => {
    render(<DropArea loading={true} />);
    const button = screen.getByTestId('show-addresses');
    expect(button).toBeDisabled();
  });

  it('drop area classNames changes properly on dragEnter and DragLeave', () => {
    const processFile = jest.fn();
    render(<DropArea processFile={processFile} />);

    //rendering
    const droparea = screen.getByTestId('droparea');

    //does not include the active class on first render
    expect(droparea).not.toHaveClass('active');

    //include active class on drag enter
    fireEvent.dragEnter(droparea);
    expect(droparea).toHaveClass('active');
    //does not include active class on drag leave
    fireEvent.dragLeave(droparea);
    expect(droparea).not.toHaveClass('active');
  });

  it('displays errors and disable show address buttons when wrong file is droped', () => {
    render(<DropArea />);

    //rendering
    const droparea = screen.getByTestId('droparea');
    //Give errors when a wrong file type is dropped or file with size greater that 1MB
    const wrongFile = new File(['blob'], 'wrongfile.png', {
      type: 'image/jpg',
    });
    Object.defineProperty(wrongFile, 'size', {
      value: 1024 * 1024 * 20,
    });
    const wrongFileDropEvent = createEvent.drop(droparea);

    Object.defineProperty(wrongFileDropEvent, 'dataTransfer', {
      value: {
        files: [wrongFile],
      },
    });
    fireEvent(droparea, wrongFileDropEvent);
    expect(droparea).toHaveClass('error');
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(
      screen.getByText(/invalid file format/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/file too large/i)).toBeInTheDocument();
    const button = screen.getByTestId('show-addresses');
    expect(button).toBeDisabled();
  });

  it('shows no error when the write file is droped, activate button and when button is clicked calles processFile prop with the file', () => {
    const processFile = jest.fn();
    render(<DropArea processFile={processFile} />);
    const droparea = screen.getByTestId('droparea');
    const rightFile = new File(['blob'], 'writeFile.json', {
      type: 'application/json',
    });

    const rightFileDropEvent = createEvent.drop(droparea);

    Object.defineProperty(rightFileDropEvent, 'dataTransfer', {
      value: {
        files: [rightFile],
      },
    });

    const button = screen.getByTestId('show-addresses');
    fireEvent(droparea, rightFileDropEvent);
    expect(button).not.toBeDisabled();
    expect(droparea).not.toHaveClass('error');
    expect(droparea).not.toHaveTextContent('DROP FILE HERE');
    expect(droparea).toHaveTextContent(rightFile.name);
    //on clicking the show address button, processFile fuction should be called with the file
    fireEvent.click(button);
    expect(processFile).toHaveBeenCalledTimes(1);
    expect(processFile).toHaveBeenCalledWith(rightFile);
  });
});
