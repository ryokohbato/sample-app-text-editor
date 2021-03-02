import { CommandHistory, Command } from "../src/script/modules/commandHistory";

describe("Command History", () => {
  it("First", () => {
    expect(CommandHistory.GetCommandHistoryLength()).toBe(0);
  })

  it("Pop - Error", () => {
    expect(() => {
      CommandHistory.Pop()
    }).toThrow();
  })

  it("Push", () => {
    CommandHistory.Push(GetRandomCommand());

    expect(CommandHistory.GetCommandHistoryLength()).toBe(1);
    expect(CommandHistory.GetRemovedCommandHistoryLength()).toBe(0);
  })

  it("Pop : 2 -> 1", () => {
    CommandHistory.Push(GetRandomCommand());
    expect(CommandHistory.Pop()).toBe(true);
    expect(CommandHistory.GetRemovedCommandHistoryLength()).toBe(1);
  })

  it("Pop : 2 -> 1", () => {
    expect(CommandHistory.Pop()).toBe(false);
    expect(CommandHistory.GetRemovedCommandHistoryLength()).toBe(2);
  })

  it("Push - delete removed command history", () => {
    CommandHistory.Push(GetRandomCommand());
    expect(CommandHistory.GetRemovedCommandHistoryLength()).toBe(0);
  })
})

const GetRandomCommand = (): Command => {
  return {
    commandFlag: 'Insert',
    args: {
      text: `Test_${Math.floor(Math.random() * 100)}`,
      index: Math.random() * 100,
    },
    textStyle: {
      fontFamily: 'serif',
      fontSize: Math.random() * 20,
      isTextBold: Math.random() > 0.5 ? true : false,
      isTextItalic: Math.random() > 0.5 ? true : false,
      isTextUnderlined: Math.random() > 0.5 ? true : false,
      textColor: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
      },
      backgroundColor: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
      },
      underlineColor: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
      },
    },
  }
}