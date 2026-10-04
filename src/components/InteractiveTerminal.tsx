import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Trash2, CornerDownLeft } from 'lucide-react';
import { terminalCommands } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';

interface LogEntry {
  command: string;
  response: string | string[];
  id: number;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      command: 'whoami',
      response: terminalCommands['whoami'],
    },
    {
      id: 2,
      command: 'skills',
      response: terminalCommands['skills'],
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const handleExecute = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun || inputVal).trim().toLowerCase();
    if (!rawCmd) return;

    if (rawCmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    const response = terminalCommands[rawCmd] || `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;

    setLogs((prev) => [
      ...prev,
      {
        command: rawCmd,
        response,
        id: Date.now(),
      },
    ]);

    setInputVal('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const suggestedCmds = ['whoami', 'skills', 'projects', 'education', 'experience', 'certifications', 'stats', 'contact', 'help', 'clear'];

  return (
    <section id="terminal" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D9AFC4]/40 text-[#D9AFC4] text-xs font-mono mb-3"
          >
            <Terminal className="w-3 h-3 text-[#D9AFC4]" />
            <span>INTERACTIVE CLI EMULATOR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            INTERACTIVE <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C8B8D2] to-[#D9AFC4] bg-clip-text text-transparent">TERMINAL</span>
          </motion.h2>

          <p className="text-[#C8B8D2] text-xs sm:text-sm max-w-xl mt-3 font-mono">
            Execute terminal commands to query portfolio data or tap the suggestions below.
          </p>
        </div>

        {/* Suggested Quick Commands */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono text-[#A88FB5] mr-1">Quick Run:</span>
          {suggestedCmds.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecute(cmd)}
              onMouseEnter={() => setCursor(`$ ${cmd}`, 'button')}
              onMouseLeave={resetCursor}
              className="px-3 py-1 rounded-xl bg-[#24152A] hover:bg-[#4B2855] text-[#D9AFC4] hover:text-white border border-[#4B2855] hover:border-[#D9AFC4]/60 text-[11px] font-mono transition-all"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#160F1B] border border-[#A88FB5]/40 shadow-[0_25px_60px_rgba(22,15,27,0.9)] overflow-hidden text-left font-mono text-xs sm:text-sm"
        >
          {/* Terminal Window Title Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#24152A] border-b border-[#4B2855]/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D9AFC4]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#A88FB5]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#6F4A78]/80 inline-block" />
              <span className="text-[#C8B8D2] text-xs font-mono ml-2">vaishnavi@portfolio:~$</span>
            </div>
            <div className="flex items-center gap-2 text-[#A88FB5] text-[11px]">
              <span>bash v5.2</span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-[#D9AFC4] transition-colors p-1"
                title="Clear terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Logs & Outputs */}
          <div className="p-5 sm:p-6 max-h-[380px] overflow-y-auto space-y-4">
            <div className="text-[#A88FB5] text-xs">
              Welcome to Vaishnavi's Interactive Shell. Type <span className="text-[#D9AFC4] font-semibold">'help'</span> to see available commands.
            </div>

            {logs.map((log) => (
              <div key={log.id} className="space-y-1.5">
                {/* Command prompt */}
                <div className="flex items-center gap-2 text-[#D9AFC4]">
                  <span className="text-[#C8B8D2] font-bold">vaishnavi@portfolio:~$</span>
                  <span className="text-[#FFFFFF] font-semibold">{log.command}</span>
                </div>

                {/* Output */}
                <div className="text-[#F4EDE7]/90 pl-4 border-l-2 border-[#4B2855] space-y-1">
                  {Array.isArray(log.response) ? (
                    log.response.map((line, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {line}
                      </div>
                    ))
                  ) : (
                    <div className="leading-relaxed">{log.response}</div>
                  )}
                </div>
              </div>
            ))}

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecute();
            }}
            className="px-4 sm:px-6 py-3.5 bg-[#24152A]/90 border-t border-[#4B2855]/80 flex items-center gap-3"
          >
            <span className="text-[#C8B8D2] font-bold shrink-0">vaishnavi@portfolio:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command here..."
              className="w-full bg-transparent text-[#FFFFFF] text-xs sm:text-sm font-mono focus:outline-none placeholder:text-[#A88FB5]/60"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#4B2855] text-[#D9AFC4] hover:bg-[#6F4A78] transition-colors"
              aria-label="Send command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
