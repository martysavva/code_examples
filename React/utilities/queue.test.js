// Function
import queue from "./queue";

// Setup
const name = "queue";
const testFunc = queue;
const type = "impure"; // pure / impure
const deps = [""];


describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {


  it("should add to queue and run first item", () => {
    // mock function
    const mockEvent = jest.fn();

    // setup
    const queue = testFunc();
    queue.add(()=>mockEvent('1'));
    queue.add(()=>mockEvent('2'));
    queue.add(()=>mockEvent('3'));
    queue.add(()=>mockEvent('4'));
    queue.add(()=>mockEvent('5'));

    expect(mockEvent.mock.calls.length).toEqual(1);
    expect(mockEvent.mock.calls[0]).toEqual(['1']);
  });

  it("should run next item when next is called", () => {
    // mock function
    const mockEvent = jest.fn();

    // setup
    const queue = testFunc();
    queue.add(()=>mockEvent('1'));
    queue.add(()=>mockEvent('2'));
    queue.add(()=>mockEvent('3'));
    queue.add(()=>mockEvent('4'));
    queue.add(()=>mockEvent('5'));
    queue.next();

    expect(mockEvent.mock.calls.length).toEqual(2);
    expect(mockEvent.mock.calls[0]).toEqual(['1']);
    expect(mockEvent.mock.calls[1]).toEqual(['2']);
  });

  it("should stop queue when reset is called", () => {
    // mock function
    const mockEvent = jest.fn();

    // setup
    const queue = testFunc();
    queue.add(()=>mockEvent('1'));
    queue.add(()=>mockEvent('2'));
    queue.add(()=>mockEvent('3'));
    queue.add(()=>mockEvent('4'));
    queue.add(()=>mockEvent('5'));
    queue.next();
    queue.reset();
    queue.next();
    queue.next();

    expect(mockEvent.mock.calls.length).toEqual(2);
    expect(mockEvent.mock.calls[0]).toEqual(['1']);
    expect(mockEvent.mock.calls[1]).toEqual(['2']);
  });

});
