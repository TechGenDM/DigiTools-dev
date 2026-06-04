import os
import glob

# Directory containing the files
components_dir = "client/src/components"
pages_dir = "client/src/pages"

# Find all tsx files
files = glob.glob(f"{components_dir}/**/*.tsx", recursive=True) + glob.glob(f"{pages_dir}/**/*.tsx", recursive=True)

# Replacements to make
replacements = {
    # Typography
    'text-white': 'text-slate-900 dark:text-white',
    'text-slate-400': 'text-slate-600 dark:text-slate-400',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
    'text-indigo-300': 'text-indigo-700 dark:text-indigo-300',
    'text-indigo-400': 'text-indigo-600 dark:text-indigo-400',
    'text-emerald-300': 'text-emerald-700 dark:text-emerald-300',
    'text-emerald-400': 'text-emerald-600 dark:text-emerald-400',
    'text-rose-300': 'text-rose-700 dark:text-rose-300',
    'text-rose-400': 'text-rose-600 dark:text-rose-400',
    'text-amber-300': 'text-amber-700 dark:text-amber-300',
    'text-amber-400': 'text-amber-600 dark:text-amber-400',
    'text-cyan-300': 'text-cyan-700 dark:text-cyan-300',
    'text-cyan-400': 'text-cyan-600 dark:text-cyan-400',
    'text-blue-300': 'text-blue-700 dark:text-blue-300',
    'text-blue-400': 'text-blue-600 dark:text-blue-400',
    'text-purple-300': 'text-purple-700 dark:text-purple-300',
    'text-purple-400': 'text-purple-600 dark:text-purple-400',
    
    # Backgrounds & Borders
    'bg-white/5': 'bg-black/5 dark:bg-white/5',
    'bg-white/10': 'bg-black/10 dark:bg-white/10',
    'bg-white/20': 'bg-black/20 dark:bg-white/20',
    'border-white/5': 'border-black/5 dark:border-white/5',
    'border-white/10': 'border-black/10 dark:border-white/10',
    'border-white/20': 'border-black/20 dark:border-white/20',
    'hover:bg-white/10': 'hover:bg-black/10 dark:hover:bg-white/10',
    'hover:bg-white/20': 'hover:bg-black/20 dark:hover:bg-white/20',
    'hover:border-white/20': 'hover:border-black/20 dark:hover:border-white/20',
    
    # Specific color blocks
    'bg-indigo-500/10': 'bg-indigo-500/10 dark:bg-indigo-500/20',
    'border-indigo-500/20': 'border-indigo-200 dark:border-indigo-500/20',
    
    'bg-emerald-500/10': 'bg-emerald-500/10 dark:bg-emerald-500/20',
    'border-emerald-500/20': 'border-emerald-200 dark:border-emerald-500/20',
    
    'bg-rose-500/10': 'bg-rose-500/10 dark:bg-rose-500/20',
    'border-rose-500/20': 'border-rose-200 dark:border-rose-500/20',
    
    'bg-amber-500/10': 'bg-amber-500/10 dark:bg-amber-500/20',
    'border-amber-500/20': 'border-amber-200 dark:border-amber-500/20',
    
    'bg-cyan-500/10': 'bg-cyan-500/10 dark:bg-cyan-500/20',
    'border-cyan-500/20': 'border-cyan-200 dark:border-cyan-500/20',
    
    # Preventing duplicates or breaking specific components
    'dark:text-slate-900 dark:text-white': 'dark:text-white text-slate-900', 
    'text-slate-900 text-slate-900 dark:text-white': 'text-slate-900 dark:text-white',
    
    # UnitConverter fix
    '"bg-white/5': '"bg-black/5 dark:bg-white/5',
    'bg-slate-900 text-slate-900 dark:text-white': 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white',
    
    # Tooltip / Dropdowns
    'appearance-none': 'appearance-none text-slate-900 dark:text-white',
}

def replace_in_file(filepath):
    # Don't touch Navbar.tsx since we already did it manually
    if "Navbar.tsx" in filepath or "ThemeProvider.tsx" in filepath:
        return
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    original = content
    for old, new in replacements.items():
        # Quick hack to prevent recursive replacement of already updated strings
        if old == 'text-white' and 'text-slate-900 dark:text-white' in content:
            # We skip simple replace if we know it might duplicate, but we'll run a cleanup pass
            pass
            
    # Safer replace using token boundaries, but simple replace for tailwind classes is usually fine
    # because they are space separated
    
    # We will do a word boundary replace for exact tailwind classes
    import re
    for old, new in replacements.items():
        # Escape special chars in old string like /
        escaped_old = re.escape(old)
        
        # Ensure we don't replace if it's already part of the new string (e.g. dark:text-white)
        if "dark:" not in old:
            # Replace old with new, but only if not preceded by dark: or hover: (unless hover is part of old)
            if "hover:" not in old:
                pattern = r'(?<!dark:)(?<!hover:)\b' + escaped_old + r'(?!\S)'
            else:
                pattern = r'(?<!dark:)\b' + escaped_old + r'(?!\S)'
                
            content = re.sub(pattern, new, content)
        else:
            content = content.replace(old, new)
            
    # Fix nested darks
    content = content.replace("text-slate-900 dark:text-slate-900 dark:text-white", "text-slate-900 dark:text-white")
    content = content.replace("text-slate-600 dark:text-slate-600 dark:text-slate-400", "text-slate-600 dark:text-slate-400")
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for file in files:
    replace_in_file(file)

print("Done!")
